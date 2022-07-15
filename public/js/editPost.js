const editButtonHandler = async (event) => {
    const title = document.querySelector("#edit-title").value.trim();
    const content = document.querySelector("#edit-desc").value.trim();
  
    const id = event.target.getAttribute("data-id");
    console.log(id,title,content)
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: title, content: content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      window.location.assign(`/dashboard/posts/${id}`);
    } else {
      alert("Failed to update post");
    }
  };
  
  const updateButton = document.querySelector(".post-list");
  
  if (updateButton) {
    updateButton.addEventListener("click", editButtonHandler);
  }