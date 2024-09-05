export function closeModal(e, ...funcs){
    e.preventDefault();
    // setLoader(false);
    console.log("toggle Model");
    (document.getElementById("handleAuthModal")).click();
    funcs.forEach(f => {
        if(typeof f==='function'){
            f();
        }
    });
}