#pragma once

class oop {
  oopDesc* _o;

  void register_oop();
  void unregister_oop();

  // friend class markOop;
public:
  void set_obj(const void* p)         {
    raw_set_obj(p);
    if (CheckUnhandledOops) register_oop();
  }
  void raw_set_obj(const void* p)     { _o = (oopDesc*)p; }

  oop()                               { set_obj(NULL); }
  oop(const oop& o)                   { set_obj(o.obj()); }
  oop(const volatile oop& o)          { set_obj(o.obj()); }
  oop(const void* p)                  { set_obj(p); }
  ~oop()                              {
    if (CheckUnhandledOops) unregister_oop();
  }

  oopDesc* obj()  const volatile      { return _o; }

  // General access
  oopDesc*  operator->() const        { return obj(); }
  bool operator==(const oop o) const  { return obj() == o.obj(); }
  bool operator==(void *p) const      { return obj() == p; }
  bool operator!=(const volatile oop o) const  { return obj() != o.obj(); }
  bool operator!=(void *p) const      { return obj() != p; }

  bool operator<(oop o) const         { return obj() < o.obj(); }
  bool operator>(oop o) const         { return obj() > o.obj(); }
  bool operator<=(oop o) const        { return obj() <= o.obj(); }
  bool operator>=(oop o) const        { return obj() >= o.obj(); }
  bool operator!() const              { return !obj(); }

  // Assignment
  oop& operator=(const oop& o)                            { _o = o.obj(); return *this; }
#ifndef SOLARIS
  volatile oop& operator=(const oop& o) volatile          { _o = o.obj(); return *this; }
#endif
  volatile oop& operator=(const volatile oop& o) volatile { _o = o.obj(); return *this; }

  // Explict user conversions
  operator void* () const             { return (void *)obj(); }
#ifndef SOLARIS
  operator void* () const volatile    { return (void *)obj(); }
#endif
  operator HeapWord* () const         { return (HeapWord*)obj(); }
  operator oopDesc* () const          { return obj(); }
  operator intptr_t* () const         { return (intptr_t*)obj(); }
  operator PromotedObject* () const   { return (PromotedObject*)obj(); }
  operator markOop () const           { return markOop(obj()); }

  operator address   () const         { return (address)obj(); }

  // from javaCalls.cpp
  operator jobject () const           { return (jobject)obj(); }
  // from javaClasses.cpp
  operator JavaThread* () const       { return (JavaThread*)obj(); }

#ifndef _LP64
  // from jvm.cpp
  operator jlong* () const            { return (jlong*)obj(); }
#endif

  // from parNewGeneration and other things that want to get to the end of
  // an oop for stuff (like ObjArrayKlass.cpp)
  operator oop* () const              { return (oop *)obj(); }
};