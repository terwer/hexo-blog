---
title: Java中的静态代码块、构造代码块、构造函数以及Java类初始化顺序
date: '2012-05-10 00:00:00'
updated: '2023-08-27 13:50:06'
excerpt: >-
  本文介绍了静态代码块、构造代码块和构造函数的概念和作用，以及它们的执行顺序和区别。静态代码块在类加载时执行一次，构造代码块在对象创建时执行，构造函数用于对象初始化。文章还讨论了类继承时的静态代码块执行顺序。
tags:
  - javase
  - static
  - block
  - 静态代码块
  - 构造代码块
  - 构造方法
  - 实例方法
categories:
  - 技术分享
  - Java SE
  - 面向对象
permalink: >-
  /post/static-code-blocks-structural-code-blocks-constructors-and-java-class-initialization-order-in-java-1wxht7.html
comments: true
toc: true
---


## 术语解释

静态代码块：用 staitc 声明，jvm ==加载类时==执行，仅执行==一次==。

构造代码块：类中直接用 =={}== 定义，每一次==创建对象时==执行。如果==每个构造函数都需要初始化变量==，即可通过构造代码块来实现。从而取代在每个构造函数调用初始化实例变量的方法。

构造方法：==对象初始化==调用的方法，只有初始化才能调用。

实例方法：==类实例化之后==才能调用的方法，属于每一个实例。

执行顺序优先级：==静态代码块==、==main()==、==构造代码块==、==构造方法==、==实例方法==。

## 静态代码块

```java
static {
//静态代码块  
}
```

* 关于静态代码块，要注意的是什么？

  1. 它是**随着类的加载而执行，只执行一次，并优先于主函数**。具体说，**静态代码块是由类调用**的。类调用时，先执行静态代码块，然后才执行主函数的。
  2. **静态代码块其实就是给类初始化的，而构造代码块是给对象初始化的**。
  3. 静态代码块中的变量是局部变量，与普通函数中的局部变量性质没有区别。
  4. 一个类中可以有多个静态代码块。

## 构造代码块

```java
{
//构造代码块  
}
```

* 关于构造代码块，以下几点要注意？

  1. 构造代码块的作用是给对象进行初始化。
  2. **对象一建立就运行构造代码块了，而且优先于构造函数执行**。这里要强调一下，有对象建立，才会运行构造代码块，类不能调用构造代码块的，而且**构造代码块与构造函数的执行顺序是前者先于后者执行**。
  3. 构造代码块与构造函数的区别是：**构造代码块是给所有对象进行统一初始化，而构造函数是给对应的对象初始化**，因为构造函数是可以多个的，运行哪个构造函数就会建立什么样的对象，但无论建立哪个对象，都会先执行相同的构造代码块。也就是说，构造代码块中定义的是不同对象共性的初始化内容。

## 构造函数

```java
public HelloA(){
//构造函数
}
```

* 关于构造函数，以下几点要注意？

  1. **对象一建立，就会调用与之相应的构造函数**，也就是说，不建立对象，构造函数是不会运行的。
  2. 构造函数的作用是用于给对象进行初始化。
  3. 一个对象建立，构造函数只运行一次，而一般方法可以被该对象调用多次。

## Java 类初始化顺序

### 对于一个类的情况

```java
/**
 * 单独类静态代码块
 *
 * @name: StaticBlockTest
 * @author: terwer
 * @date: 2022-05-11 01:16
 **/
public class StaticBlockTest {
    static {
        System.out.println("静态代码块执行");
    }

    public static void main(String[] args) {
        System.out.println("main方法执行");
    }

    // 运行结果
    // 静态代码块执行
    // main方法执行
}
```

```java
/**
 * 静态代码块测试
 *
 * @name: StaticBlockTest2
 * @author: terwer
 * @date: 2022-05-11 01:08
 **/
public class StaticBlockTest2 {
    static {
        System.out.println("静态代码块1执行");
    }

    {
        System.out.println("构造代码块1执行");
    }

    static {
        System.out.println("静态代码块2执行");
    }

    {
        System.out.println("构造代码块2执行");
    }

    public StaticBlockTest2() {
        System.out.println("构造函数执行");
    }

    public static void main(String[] args) {
        System.out.println("main方法执行");

        StaticBlockTest2 staticBlock = new StaticBlockTest2();
        staticBlock.test();
    }

    public void test() {
        System.out.println("实例方法执行");
    }

    // 运行结果
    // 静态代码块1执行
    // 静态代码块2执行
    // main方法执行
    // 构造代码块1执行
    // 构造代码块2执行
    // 构造函数执行
    // 实例方法执行
}
```

### 对于类继承的情况

```java
/**
 * 静态代码块继承测试
 *
 * @name: StaticBlockTest
 * @author: terwer
 * @date: 2022-05-11 01:16
 **/
public class StaticBlockSubTest {
    static {
        System.out.println("父类静态代码块执行");
    }

    public static void main(String[] args) {
        System.out.println("父类main方法执行");
    }

    // 运行结果
    // 父类静态代码块执行
    // 父类main方法执行
}

class Sub extends StaticBlockTest{
    static {
        System.out.println("子类静态代码块执行");
    }

    public static void main(String[] args) {
        System.out.println("子类main方法执行");
    }
}
```

```java
/**
 * 静态代码块继承测试
 *
 * @name: StaticBlockTest
 * @author: terwer
 * @date: 2022-05-11 01:16
 **/
public class StaticBlockSubTest2 {
    static {
        System.out.println("父类静态代码块1执行");
    }

    {
        System.out.println("父类构造代码块1执行");
    }

    static {
        System.out.println("父类静态代码块2执行");
    }

    {
        System.out.println("父类构造代码块2执行");
    }

    public StaticBlockSubTest2() {
        System.out.println("父类构造函数执行");
    }

    public static void main(String[] args) {
        System.out.println("父类main方法执行");

        Sub2 sub2 = new Sub2();
        sub2.test();
    }

    public void test() {
        System.out.println("父类实例方法执行");
    }

    // 运行结果
    // 父类静态代码块1执行
    // 父类静态代码块2执行
    // 父类main方法执行
    // 子类静态代码块1执行
    // 子类静态代码块2执行
    // 父类构造代码块1执行
    // 父类构造代码块2执行
    // 父类构造函数执行
    // 子类构造代码块1执行
    // 子类构造代码块2执行
    // 子类构造函数执行
    // 子类实例方法执行
}

class Sub2 extends StaticBlockSubTest2 {
    static {
        System.out.println("子类静态代码块1执行");
    }

    {
        System.out.println("子类构造代码块1执行");
    }

    static {
        System.out.println("子类静态代码块2执行");
    }

    {
        System.out.println("子类构造代码块2执行");
    }

    public Sub2() {
        System.out.println("子类构造函数执行");
    }

    public void test() {
        System.out.println("子类实例方法执行");
    }
}
```

总结：

* 当涉及到继承时，按照什么顺序执行？

  1. 执行父类的静态代码块，并初始化父类静态成员变量
  2. 执行子类的静态代码块，并初始化子类静态成员变量
  3. 执行父类的构造代码块，执行父类的构造函数，并初始化父类普通成员变量
  4. 执行子类的构造代码块， 执行子类的构造函数，并初始化子类普通成员变量

Java 初始化顺序是什么样的？

​![img](https://img1.terwer.space/20220511013154.png)​

实例

```java
/**
 * 类加载顺序
 *
 * @name: SubClass
 * @author: terwer
 * @date: 2022-05-11 01:33
 **/
class Parent {
    /* 静态变量 */
    public static String p_StaticField = "父类--静态变量";
    /* 变量 */
    public String p_Field = "父类--变量";
    protected int i = 9;
    protected int j = 0;

    /* 静态初始化块 */
    static {
        System.out.println(p_StaticField);
        System.out.println("父类--静态初始化块");
    }

    /* 初始化块 */ {
        System.out.println(p_Field);
        System.out.println("父类--初始化块");
    }

    /* 构造器 */
    public Parent() {
        System.out.println("父类--构造器");
        System.out.println("i=" + i + ", j=" + j);
        j = 20;
    }
}

public class SubClass extends Parent {
    /* 静态变量 */
    public static String s_StaticField = "子类--静态变量";
    /* 变量 */
    public String s_Field = "子类--变量";

    /* 静态初始化块 */
    static {
        System.out.println(s_StaticField);
        System.out.println("子类--静态初始化块");
    }

    /* 初始化块 */ {
        System.out.println(s_Field);
        System.out.println("子类--初始化块");
    }

    /* 构造器 */
    public SubClass() {
        System.out.println("子类--构造器");
        System.out.println("i=" + i + ",j=" + j);
    }


    /* 程序入口 */
    public static void main(String[] args) {
        System.out.println("子类main方法");
        new SubClass();
    }
}
```

运行结果：

​![image-20220511013454672](https://img1.terwer.space/20220511013455.png)​

## 延伸阅读

[从虚拟机角度理解，为什么静态块函数先于构造函数执行](https://depp.wang/2020/05/06/static-block-method-and-constructor-method/)

> 文章更新历史
>
> 2012/05/11 feat: 初稿

‍
