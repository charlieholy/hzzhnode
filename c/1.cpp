int foo(int x,int y){
    int t = x + y;
    return t;
}


//1.o:     file format pe-i386
//
//
//Disassembly of section .text:
//
//00000000 <__Z3fooii>:
//   0:   55                      push   %ebp
//   1:   89 e5                   mov    %esp,%ebp
//   3:   83 ec 10                sub    $0x10,%esp
//   6:   8b 55 08                mov    0x8(%ebp),%edx
//   9:   8b 45 0c                mov    0xc(%ebp),%eax
//   c:   01 d0                   add    %edx,%eax
//   e:   89 45 fc                mov    %eax,-0x4(%ebp)
//  11:   8b 45 fc                mov    -0x4(%ebp),%eax
//  14:   c9                      leave
//  15:   c3                      ret
//  16:   90                      nop
//  17:   90                      nop
