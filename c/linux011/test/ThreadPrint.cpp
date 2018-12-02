#include <thread>
#include <iostream>
using namespace std;
void TestThread1();
void TestThread2();

void TestThread1(){
while(true)
cout << "t123" << endl;
}
void TestThread2(){
while(true)
cout << "t321" << endl;
}

int main(){
    cout << "hello" << endl;
    thread t1(TestThread1);
    thread t2(TestThread2);
    t1.join();
    t2.join();
    return 0;
}