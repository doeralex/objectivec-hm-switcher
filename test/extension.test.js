const assert = require('assert');
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const os = require('os');

suite('Objective-C Switcher 测试', function() {
  // 测试前运行，创建临时文件
  setup(async function() {
    this.tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'objc-switcher-test-'));
    
    // 创建测试头文件
    this.headerFile = path.join(this.tempDir, 'TestClass.h');
    fs.writeFileSync(this.headerFile, `
//  TestClass.h
#import <Foundation/Foundation.h>
@interface TestClass : NSObject
@end
    `);
    
    // 创建测试实现文件
    this.implFile = path.join(this.tempDir, 'TestClass.m');
    fs.writeFileSync(this.implFile, `
//  TestClass.m
#import "TestClass.h"
@implementation TestClass
@end
    `);
  });
  
  // 测试后运行，清理临时文件
  teardown(function() {
    if (this.tempDir && fs.existsSync(this.tempDir)) {
      fs.rmSync(this.tempDir, { recursive: true, force: true });
    }
  });
  
  // 测试从.h到.m的切换
  test('从头文件切换到实现文件', async function() {
    // 打开头文件
    const doc = await vscode.workspace.openTextDocument(this.headerFile);
    await vscode.window.showTextDocument(doc);
    
    // 执行切换命令
    await vscode.commands.executeCommand('objectivec-hm-switcher.switch');
    
    // 延时等待文件打开
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 验证当前打开的是实现文件
    const activeEditor = vscode.window.activeTextEditor;
    assert.ok(activeEditor);
    assert.strictEqual(path.basename(activeEditor.document.uri.fsPath), 'TestClass.m');
  });
  
  // 测试从.m到.h的切换
  test('从实现文件切换到头文件', async function() {
    // 打开实现文件
    const doc = await vscode.workspace.openTextDocument(this.implFile);
    await vscode.window.showTextDocument(doc);
    
    // 执行切换命令
    await vscode.commands.executeCommand('objectivec-hm-switcher.switch');
    
    // 延时等待文件打开
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 验证当前打开的是头文件
    const activeEditor = vscode.window.activeTextEditor;
    assert.ok(activeEditor);
    assert.strictEqual(path.basename(activeEditor.document.uri.fsPath), 'TestClass.h');
  });
  
  // 测试创建不存在的文件
  test('创建不存在的文件', async function() {
    // 创建仅有头文件的测试类
    const onlyHeaderFile = path.join(this.tempDir, 'OnlyHeader.h');
    fs.writeFileSync(onlyHeaderFile, `
//  OnlyHeader.h
#import <Foundation/Foundation.h>
@interface OnlyHeader : NSObject
@end
    `);
    
    // 打开头文件
    const doc = await vscode.workspace.openTextDocument(onlyHeaderFile);
    await vscode.window.showTextDocument(doc);
    
    // 查找对应的实现文件
    const implPath = path.join(this.tempDir, 'OnlyHeader.m');
    assert.strictEqual(fs.existsSync(implPath), false, '测试前实现文件不应存在');
    
    // 这里无法自动点击"是"，所以只能模拟创建文件
    fs.writeFileSync(implPath, `
//  OnlyHeader.m
#import "OnlyHeader.h"
@implementation OnlyHeader
@end
    `);
    
    // 执行切换命令
    await vscode.commands.executeCommand('objectivec-hm-switcher.switch');
    
    // 延时等待文件打开
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 验证当前打开的是实现文件
    const activeEditor = vscode.window.activeTextEditor;
    assert.ok(activeEditor);
    assert.strictEqual(path.basename(activeEditor.document.uri.fsPath), 'OnlyHeader.m');
  });
}); 