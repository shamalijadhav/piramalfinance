import { getProps } from "../../scripts/scripts.js";

function createButton(text, picture) {
    const button = document.createElement("button");
    button.classList.add("carousel-control", text);
    button.innerHTML = (picture)
    return button;
}
export default function decorate(block) {
    // const [name, id, type] = block.children;
    // const names = name.innerText.split(",");
    // const ids = id.innerText.split(",");
    // const classes = type.innerText.trim();
    const [name, id, classes, prev, next, ...imageSrc] = getProps(block, {
        index: [3, 4]
    });
    const names = name.split(",");
    const ids = id.split(",");
    const imagesSrc = [...imageSrc];

    let tabsTemplate = '';
    block.innerHTML = '';
    block.classList.add(classes ? classes : "normal");
    const carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel-inner");
    carouselInner.id = "carouselInner";
    names.forEach(function (eachName, index) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = imagesSrc[index];
        img.alt = eachName;
        img.id = ids[index].trim().replace(/ /g, '-');
        div.id = ids[index].trim().replace(/ /g, '-');
        if (index) {
            div.classList.add("carousel-item");
        } else {
            div.classList.add("carousel-item", "active");
        }
        div.append(imagesSrc[index] ? img : eachName.trim());
        carouselInner.append(div);
        // carouselInner.append(imagesSrc[index] ? img : div);
        // observer.observe(div);
        // tabsTemplate += `<div id="${ids[index].trim().replace(/ /g, '-')}">${eachName.trim()}</div>`
    });

    const prevButton = createButton("prev", prev?.outerHTML);
    const nextButton = createButton("next", next?.outerHTML);
    prevButton.classList.add(classes === "normal" ? "dp-none" : "dp-normal");
    nextButton.classList.add(classes === "normal" ? "dp-none" : "dp-normal");
    // <button class="carousel-control prev" onclick="prevSlide()">&#10094;</button>
    // <button class="carousel-control next" onclick="nextSlide()">&#10095;</button>
    block.append(carouselInner);

    if (classes === "carousel") {
        block.append(prevButton);
        block.append(nextButton);
        prevButton.addEventListener("click", prevSlide);
        nextButton.addEventListener("click", nextSlide);
        let currentSlide = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        // block = document.getElementById('carousel');
        const slides = document.querySelectorAll('.carousel-item');

        block.addEventListener('mousedown', dragStart);
        block.addEventListener('mouseup', dragEnd);
        block.addEventListener('mouseleave', dragEnd);
        block.addEventListener('mousemove', drag);

        block.addEventListener('touchstart', dragStart);
        block.addEventListener('touchend', dragEnd);
        block.addEventListener('touchmove', drag);

        function dragStart(event) {
            isDragging = true;
            startPos = getPositionX(event);
            carouselInner.style.transition = 'none';
        }

        function dragEnd() {
            isDragging = false;
            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -100) {
                nextSlide();
            } else if (movedBy > 100) {
                prevSlide();
            } else {
                setPositionByIndex();
            }
        }

        function drag(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + currentPosition - startPos;
                carouselInner.style.transform = `translateX(${currentTranslate}px)`;
            }
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }

        function showSlide(index) {
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }

            setPositionByIndex();
        }

        function setPositionByIndex() {
            currentTranslate = currentSlide * -carouselInner.clientWidth;
            prevTranslate = currentTranslate;
            carouselInner.style.transition = 'transform 0.5s ease';
            carouselInner.style.transform = `translateX(${currentTranslate}px)`;
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Initialize the carousel
        showSlide(currentSlide);

    }

    block.addEventListener("click", function (e) {
        const currentEl = e.target;
        const id = currentEl.id;
        const tabContainer = id && document.querySelector('[data-id=' + id + ']')
        if (tabContainer) {
            const section = tabContainer.closest(".section");
            section.querySelectorAll(".tab-container").forEach(function (el, index) {
                // section.querySelector(".tab-name").children[0].children[index].classList.remove("active");
                section.querySelector(".tab-name").children[0].children[index].classList.remove("active");
                el.classList.add("dp-none");
                el.classList.remove("active");
            })
            tabContainer.classList.remove("dp-none");
            tabContainer.classList.add("active");
            currentEl.classList.add("active");
            currentEl.closest(".carousel-item")?.classList.add("active");
        }
    })
}