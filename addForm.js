document.forms.hero.heroName.focus();
const form = document.forms["addComment"];

const onSubmit=e=>{
    e.preventDefault();
    const addComment = {};
    addComment.comment = form.comment.value;
    addComment.name = form.name.value;
    console.log(JSON.stringify(addComment));
    return addComment;


}
form.addEventListener("submit", onSubmit, false);
