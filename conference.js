//PHOTO DE CONFERENCE EN PLEIN ENCRAN
function openLightbox(imgElement){
    const lightbox=document.getElementById('lightbox');
    const lighboxImg=document.getElementById('lightbox-img');
    lighboxImg.src=imgElement.src;
    lightbox.classList.remove('hidden');
}
function closeLightbox(){
    const lightbox=document.getElementById('lightbox');
    lightbox.classList.add('hidden');
}