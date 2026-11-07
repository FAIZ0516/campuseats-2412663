# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1

- Tool(s):
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

NONE

## Week 2

- Tool(s):
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

NONE

## Week 3

- Tool(s): Chatgpt(Codex).
- What I asked for: Help understanding the lab and working through JSON menus, the cart, checkout and my favourites feature.
- What I kept, changed or rejected, and why: I used the suggested React code in the lab as a starting point and customised the vendor data and order confirmation for my app.
- One thing the AI got wrong and how I fixed it: An early App.jsx example still imported the deleted Vendors.js file. I changed it to fetch /api/vendors.json.

## Week 4

- Tool(s): Claude
- What I asked for: Help explain and teach me the Lab 4 : the useLocalStorage, useVendors and useCart hooks, the cart context, the pages and routes and the Week 4 step of my favourites feature with an explanation of each change.
- What I kept, changed or rejected, and why: I read its explanation before do the code for my project and checked the folder structure against the Lab 4 infographic. I follow AI suggestion to kept favourites in a separate FavouritesContext so the cart context only shares what the lab lists. Before tagging I ask AI how to test the code,tested the lab's checks myself: /vendor/zzz, /nothing, refreshing with items in the cart, placing an order and the Back button.
- One thing the AI got wrong and how I fixed it: After placing an order, the page showed "Your cart is empty" for a second before going to the Orders page. It was fixed by wrapping placeOrder() and navigate('/orders') in startTransition.
