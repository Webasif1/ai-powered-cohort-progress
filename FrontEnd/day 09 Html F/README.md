<!--*** ==================================================  HTML Notes   ============================================================== ***-->


1. What is HTML and Why It is Required?
HTML (HyperText Markup Language) is the base of every website
you see. It tells the browser how to structure and display the content.
Think of it like the skeleton of a human body – without it, there’s no
structure.
 Creating a resume in MS Word where you add headings,
paragraphs, bullet points etc. Similarly, in websites, HTML tags tell
the browser: this is a heading, this is a paragraph, this is a list.
 Real-Life Example:
HTML Notes
HyperText: Text that can link to other texts or resources.

Markup: Special tags used to define structure and meaning of content.
2. Importance & Role of HTML
Language: A set of rules for writing web pages.
Structure: D efines how text, images, links, and media are placed.

Accessibility: Helps screen readers and assistive technologies understand
content.

SEO: Search engines read HTML to rank websites.

Presentation: Provides meaningful structure before CSS styles it.

Universal: Works across all devices and browsers.
 Creating a resume in MS Word where you add headings,
paragraphs, bullet points etc. Similarly, in websites, HTML tags tell
the browser: this is a heading, this is a paragraph, this is a list.
 Real-Life Example:
HTML Notes
HyperText: Text that can link to other texts or resources.

Markup: Special tags used to define structure and meaning of content.

Language: A set of rules for writing web pages.
Structure: D efines how text, images, links, and media are placed.

Accessibility: Helps screen readers and assistive technologies understand
content.

SEO: Search engines read HTML to rank websites.

Presentation: Provides meaningful structure before CSS styles it.

Universal: Works across all devices and browsers.
3. HTML Boilerplate
Before adding content, we start with a boilerplate. It’s like laying
down the foundation of a house before putting furniture inside.
Explanation:
<!DOCTYPE html> → Defines document type as HTML5.

<html lang="en"> → Root element. lang="en" means English language.

<head> → Metadata (title, encoding, styles, etc).

<meta charset="UTF-8"> → Supports all characters (English, Hindi, emojis,
etc).

<meta name="viewport"> → Makes site responsive on mobile.

<title> → Title shown on browser tab.

<body> → Everything visible on the webpage.
 Real-Life Example:
head is like the admin details of a building, and body is where
people actually live.
4. HTML Tags You Learned
4.1 Headings (h1 to h6)
4.2 Paragraph (p)
 Newspaper analogy:
Front-page headline = <h1>. Smaller news titles = <h2> or <h3>.
 Like writing a paragraph in your notebook.

 4.3 Bold (b)
 <P>Hello guys, I am <b>Arafat</b> from Sheryians</P>
4.4 Italic (i)
<P>Hello guys, I am <i>Arafat</i> from Sheryians</P>
4.5 Underline (u)
<P>Hello guys, I am <u>Arafat</u> from Sheryians</P>

4.6 Superscript (sup)
<p>2 <sup>2</sup> = 4 </p>
4.7 Subscript (sub)
<p>H<sub>2</sub>0</p>
4.8 Lorem (Dummy Text)
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia nostrum perspiciatis explicabo error, aperiam accusantium tempora id quia optio, exercitationem nam sint similique quibusdam iure dolor repellat ad molestias ullam.</p>
 Used when actual content is not ready.

 4.9 Ordered List (ol, li)
 <ol>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
  </ol>
4.10 Unordered List (ul, li)
<ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
</ul>
 Recipe steps or instructions.
 Grocery list.

 4.11 Anchor Tag (a, href, target)
<a href="https://sheryians.com/">She</a>
4.12 Comments (<!-- -->)
<!-- It is a comment  -->
4.13 Image Tag (img)
<img src="mountain.jpg" alt="mountain">

src → path of image.

alt → alternative text (important for SEO & accessibility).
<br> → Line break (new line).

<hr> → Horizontal line divider.
<img>

<br>

<hr>
 Like adding your photo to your resume.
>
 Like adding your photo to your resume.
4

5. Quick Summary Table
Tag
<h1> to <h6>
<p>
<b>, <i>, <u>
<sup>, <sub>
<ol>, <ul>, <li>
<a>
<img>
<br>, <hr>
<!-- -->
Headings
Paragraph
Formatting
Superscript & Subscript
Lists
Links
Image
Break & Line
Comment
<ul><li>Item</li></ul>
<a href="#">Link</a>
<img src="pic.png">
<br>, <hr>
<!-- Note -->
<h1>Title</h1>
<p>Hello</p>



Video
<!-- video -->
<video autoplay loop controls muted height="500px" width="300px" src="./product.mp4"></video>
Attributes: controls, autoplay, muted, loop, poster

Accessibility → captions <track>

Audio
<audio controls src="./retro.mp3"></audio>
Attributes: controls, loop, preload
Add transcripts for accessibility


<iframe src="https://www.sheryians.com/" frameborder="1"></iframe><br>
title → required for accessibility
sandbox → security
loading="lazy" → performance

Details
<details>
  <summary>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, illo?</summary>
  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint earum explicabo aspernatur odio temporibus architecto nulla atque et aperiam dolor.</p>
</details>
 Useful for FAQ / collapsible content.


html tag
 img = src,
 video = src autoplay, controls, muted, loop ,
 audio = src, ontrols , iframe,
 form,
 input, types = text, email, number, password, date, month, week, radio, check, color, button,
 details, summary


 <!-- **==========================================Basic HTML 🌐===============================================**  -->


HTML Basics 🌐
HTML Introduction:

What is HTML?
Structure of an HTML document.
HTML Elements:

Tags and attributes.
Common elements: <header>, <nav>, <section>, <article>, <footer>.
Text Formatting:

Headings (<h1> to <h6>).
Paragraphs (<p>).
Text styles (<strong>, <em>, <mark>, etc.).
Links and Images:

Hyperlinks (<a> tag).
Images (<img> tag).
Lists:

Unordered lists (<ul>, <li>).
Ordered lists (<ol>, <li>).
Tables:

Basic table structure (<table>, <tr>, <td>, <th>).
Forms:

Form elements (<form>, <input>, <label>, <button>, <select>, <textarea>).
Semantic Elements:

<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>.
HTML5 New Features:

New semantic elements.
New form input types (e.g., email, url, date).

