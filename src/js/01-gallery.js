import "../styles/01-gallery.scss";
import SimpleLightbox from "simplelightbox";
// Add imports above this line
import { galleryItems } from "./jsCopyToDist/gallery-items";
// Change code below this line

console.log(galleryItems);

function createGallery(galleryItems) {
  const gallery = [];

  galleryItems.forEach((element) => {
    const { preview, original, description } = element;
    const itemImg = document.createElement("img");
    itemImg.classList.add("gallery__image");
    itemImg.src = preview;
    itemImg.alt = description;

    const itemA = document.createElement("a");
    itemA.classList.add("gallery__link");
    itemA.href = original;
    itemA.append(itemImg);

    const itemLi = document.createElement("div");
    itemLi.classList.add("gallery__item");
    itemLi.append(itemA);

    gallery.push(itemLi);
  });
  return gallery;
}

const containerGallery = document.querySelector(".gallery");
containerGallery.append(...createGallery(galleryItems));
const gallery = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
gallery.on("show.simplelightbox");
