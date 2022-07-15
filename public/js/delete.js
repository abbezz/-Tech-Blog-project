const delButtonHandler = async (event) => {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      window.location.assign("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  };
  
  const deleteButton = document.querySelector(".post-list");
  
  if (deleteButton) {
    deleteButton.addEventListener("click", delButtonHandler);
  }