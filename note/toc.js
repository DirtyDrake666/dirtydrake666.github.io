document.addEventListener("DOMContentLoaded", function () {
    const tocContainer = document.getElementById("tocContainer");
    const tocButton = document.getElementById("tocButton");
    let headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    let tocMap = {};
    
    headers.forEach((header, index) => {
        let anchor = "toc-" + index;
        header.id = anchor;
        let link = document.createElement("a");
        link.href = "#" + anchor;
        link.textContent = header.textContent;
        
        if (header.tagName === "H1") {
            link.classList.add("toc-h1");
            tocMap[anchor] = document.createElement("div");
            tocMap[anchor].classList.add("toc-sub");
            tocContainer.appendChild(link);
            tocContainer.appendChild(tocMap[anchor]);
        } else {
            let parent = header.closest("h1")?.id || Object.keys(tocMap).slice(-1)[0];
            let subContainer = tocMap[parent];
            if (subContainer) {
                link.classList.add("toc-h" + header.tagName[1]);
                subContainer.appendChild(link);
            }
        }
        
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById(anchor).scrollIntoView({ behavior: "smooth" });
        });
    });
    
    tocContainer.querySelectorAll(".toc-h1").forEach(h1Link => {
        h1Link.addEventListener("click", function (e) {
            e.preventDefault();
            let subContainer = tocMap[h1Link.getAttribute("href").substring(1)];
            if (subContainer) {
                let isExpanded = subContainer.style.display === "block";
                subContainer.style.display = isExpanded ? "none" : "block";
                h1Link.classList.toggle("expanded", !isExpanded);
            }
        });
    });
    
    tocButton.addEventListener("click", function () {
        tocContainer.style.display = tocContainer.style.display === "block" ? "none" : "block";
    });
});