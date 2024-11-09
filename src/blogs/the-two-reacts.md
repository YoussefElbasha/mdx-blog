---
title: The Two Reacts
createdAt: 04-01-2024
---

Suppose I want to display something on your screen. Whether I want to display a web page like this blog post, an interactive web app, or even a native app that you might download from some app store, at least _two_ devices must be involved.

Your device and mine.

It starts with some code and data on _my_ device. For example, I am editing this blog post as a file on my laptop. If you see it on your screen, it must have already traveled from my device to yours. At some point, somewhere, my code and data turned into the HTML and JavaScript instructing _your_ device to display this.

So how does that relate to React? React is a UI programming paradigm that lets me break down _what_ to display (a blog post, a signup form, or even a whole app) into independent pieces called _components_, and compose them like LEGO blocks. I’ll assume you already know and like components; check [react.dev](https://react.dev/) for an intro.

Components are code, and that code has to run somewhere. But wait—_whose_ computer should they run on? Should they run on your computer? Or on mine?

Let’s make a case for each side.

First, I’ll argue that components should run on _your_ computer.

Here’s a little counter button to demonstrate interactivity. Click it a few times!

Assuming the JavaScript code for this component has already loaded, the number will increase. Notice that it increases _instantly on press_. There is no delay. No need to wait for the server. No need to download any additional data.

This is possible because this component’s code is running on _your_ computer:

```
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      className="dark:color-white rounded-lg bg-purple-700 px-2 py-1 font-sans font-semibold text-white focus:ring active:bg-purple-600"
      onClick={() => setCount(count + 1)}
    >
      You clicked me {count} times
    </button>
  );
}
```

Here, `count` is a piece of _client state_—a bit of information in your computer’s memory that updates every time you press that button. **I don’t know how many times you’re going to press the button** so I can’t predict and prepare all of its possible outputs on _my_ computer. The most I’ll dare to prepare on my computer is the _initial_ rendering output (“You clicked me 0 times”) and send it as HTML. But from that point and on, _your computer had to take over_ running this code.

You could argue that it’s _still_ not necessary to run this code on your computer. Maybe I could have it running on my server instead? Whenever you press the button, your computer could ask my server for the next rendering output. Isn’t that how websites worked before all of those client-side JavaScript frameworks?

Asking the server for a fresh UI works well when the user _expects_ a little delay—for example, when clicking a link. When the user knows they’re navigating to _some different place_ in your app, they’ll wait. However, any direct manipulation (such as dragging a slider, switching a tab, typing into a post composer, clicking a like button, swiping a card, hovering a menu, dragging a chart, and so on) would feel broken if it didn’t reliably provide at least _some_ instant feedback.

This principle isn’t strictly technical—it’s an intuition from the everyday life. For example, you wouldn’t expect an elevator button to take you to the next floor in an instant. But when you’re pushing a door handle, you _do_ expect it to follow your hand’s movement directly, or it will feel stuck. In fact, even with an elevator button you’d expect at least _some_ instant feedback: it should yield to the pressure of your hand. Then it should light up to acknowledge your press.

**When you build a user interface, you need to be able to respond to at least some interactions with _guaranteed_ low latency and with _zero_ network roundtrips.**

You might have seen the React mental model being described as a sort of an equation: _UI is a function of state_, or `UI = f(state)`. This doesn’t mean that your UI code has to literally be a single function taking state as an argument; it only means that the current state determines the UI. When the state changes, the UI needs to be recomputed. Since the state “lives” on your computer, the code to compute the UI (your components) must also run on your computer.

Or so this argument goes.

---

Next, I’ll argue the opposite—that components should run on _my_ computer.

Here’s a preview card for a different post from this blog:

```
<PostPreview slug="a-chain-reaction" />
```
