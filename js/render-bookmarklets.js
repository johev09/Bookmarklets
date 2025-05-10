

async function getTextFromFile(path) {
    const res = await fetch(path);

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return await res.text();
}

async function getBookmarklets() {
    const bookmarkletsJsonText = await getTextFromFile("bookmarklets.json");
    return JSON.parse(bookmarkletsJsonText).bookmarklets;
}


async function getListItemFromBookmarklet(bookmarklet) {
    const bookmarkJs = await getTextFromFile(`${bookmarklet.path}/bookmark.js`);

    const bookmarkletLink = document.createElement("a");
    bookmarkletLink.innerText = bookmarklet.name;
    bookmarkletLink.setAttribute("href", bookmarkJs);

    const liInnerWrapper = document.createElement("p");
    liInnerWrapper.appendChild(bookmarkletLink);

    // Add description if available.
    if (bookmarklet.description) {
        liInnerWrapper.innerHTML += `: ${bookmarklet.description}`;
    }

    const li = document.createElement("li");
    li.appendChild(liInnerWrapper);

    return li;
}


async function main() {
    const bookmarklets = await getBookmarklets();

    // populate bookmarklets-ul
    const bookmarkletsUl = document.querySelector("#bookmarklets-ul");

    for (const bookmarklet of bookmarklets) {
        // console.log(boomarklet);

        const li = await getListItemFromBookmarklet(bookmarklet);
        bookmarkletsUl.appendChild(li);
    }
}

// bookmarkletsUl.appe

main();