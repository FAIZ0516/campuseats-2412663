# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?

In plain DOM code, we need to manually tell the browser what to change and how to change it and in React,we can just describe what we want the UI to look like and React will handle the updates automatically.

2. Why must a component name start with a capital letter?

Because React uses capital letters to recognize a component.

3. What does a fragment <>...</> do, and why not just use a <div>?

A fragment allows us to group multiple elements together without adding an extra HTML element.

4. Name one benefit of splitting the UI into small components.

It makes our code easier to understand and manage.We can also reuse the same component in different parts of our application without writing the same code again.

# Week 6 reflection

1. Explain, step by step, what happens from the moment you click Place order until the new order appears on your Orders page. Name the functions in your own code that run, and say why you never call setOrders yourself.

When I click Place order, handleSubmit in CheckoutForm checks the fields with validate() and, if they pass, calls onPlaceOrder(values), which is handlePlaceOrder in CartPage. handlePlaceOrder calls placeOrders(user, cart, details) from services/orders.js. Inside placeOrders, the cart lines are grouped by vendorId using a Map, and one new order document per vendor is created with doc(collection(db, "orders")). Each order is added to a writeBatch with batch.set(), with status "Received" and createdAt: serverTimestamp(), and batch.commit() saves all of them in one go. Once that finishes, CartPage calls clearCart() and navigate("/orders"). On the Orders page, useMyOrders calls subscribeToMyOrders(user.uid), which runs onSnapshot on a query where studentUid == my uid, so the new order arrives in that callback and the hook updates its own state. I never call setOrders myself because the onSnapshot listener already picks up every change in Firestore, whether it's a new order, a new pickup time, a status change or a cancellation. That way, the page always matches what is actually in the database.

2. Why is orders a top-level collection, and why does each order copy vendorName and each item's name and price instead of storing only IDs?

Orders is a top-level collection because orders get read from more than one side. As a student, I can get all my orders from every vendor with a single query (where studentUid == uid), and later a vendor will be able to get its own orders with where vendorId == id. If orders were stored under each vendor, my orders from two vendors would need two separate reads. Each order copies vendorName and each item's name and price because Firestore doesn't support JOINs, so the Orders page can show everything from one document without fetching the vendor and the menu again. It also keeps the price I actually paid, so if a shop changes its prices later, my old order still shows the original price. The downside is that if a shop renames itself, old orders keep the old name, but that's fine for something that works like a receipt.

3. Your personal feature: which Firestore path and fields hold its data, and which line of your code reads it? Paste that line.

My feature is Favourite items. The data lives in the favourites collection, with one document per student at favourites/{uid}. That document has a single field, itemIds, which is an array of menu item IDs such as "2412663-faiz-01". When I tap the star, addFavourite calls setDoc with { merge: true } and arrayUnion(itemId), so the document gets created the first time and the same ID can never be added twice. Removing a star works the same way, but with arrayRemove. The list is read live using onSnapshot on doc(db, "favourites", uid) in services/favourites.js, so the stars stay the same on every browser and any change made in the console shows up straight away. This is the line that reads it = (snap) => onData(snap.exists() ? (snap.data().itemIds ?? []) : []),
