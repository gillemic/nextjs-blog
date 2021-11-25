---
title: 'React Hooks'
date: '2020-11-20'
---

React has several useful features built right into its massive standard library, but one of the more recent additions to the framework 
is the introduction of **Hooks**. React hooks are meant to let you use React's built-in state without having to use classes. Let's look at the **useState** React Hook.
<br>
<br>
![React Hook](/images/react_hooks.jpg)
<br>
<br>

In the above example, using the useState function, we pass in 0 as a parameter to set the default **count**. The two names in the destructured array, **count** and **setCount** are now variables that can be used to interact with the state, by using **count** to reference the current count, and **setCount** to change the value of **count**. These work much like the get/set commands in class-based programming. In the JSX block of code, **count** is referenced by simply using `<p>You clicked {count} times</p>` and **setCount** is used in the `onClick` function of the button to increment the count by 1. **useState** is just one of about a dozen built-in React Hooks, and users are free to make custom ones if needed.