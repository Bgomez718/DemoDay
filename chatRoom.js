// Selects msg container
let msgContainer = document.querySelector(".comment-flex");
//select input 
let cmntMsg = document.querySelector("#txt-box");
//create and select a div for msg to populate 
const cmntContainer = document.querySelector(".allMessages")
// select submit button and give it an event listiner 
const subBtn = document.querySelector(".comment-btn");
//input selector



//apply event listiner to button
subBtn.addEventListener("click", updateDB);

// create  section to set up fire base
const db = firebase.firestore();
//Updates the database with message

function updateDB(event) {
	event.preventDefault();
	const message = cmntMsg.value;

	cmntMsg.value = "";

	console.log(message)

	db.collection("message").add({
			message: message,

			//add message with time stamp

			created: firebase.firestore.FieldValue.serverTimestamp()
		}).then(function (docRef) {
			console.log("Document written with ID: ", docRef);
			let newDiv = document.createElement('div');
			newDiv.classList.add("comment-box");

			newDiv.innerHTML = ` <div class="profile-card">
					<div class="profile-avatar" id="profile3">

					</div>
					<div class="profile-author">
						<span> ASCstudent </span>
					</div>
				</div>
				<div class="comment-text">
<p class="message">${message} </p>

				</div>
				<div class="comment-actions">
					<span class="view-comment-btn"> 0 Comments </span>
					<span class="reply-comment-btn"> Reply <i class="material-icons" id="forum-reply-btn">
							chat_bubble
						</i> </span>`;

			msgContainer.append(newDiv);
			window.scrollTo(0, document.body.scrollHeight);
		})
		.catch(
			function (error) {
				console.error("All this hard work to mess up: ", error);
			}
		);
}



db.collection('messages').orderBy('create', 'asc').get().then(
	function (response) {
		console.log(response);
		response.forEach(
			function (doc) {
				let msg = doc.data();
				console.log(msg);
				let newP = document.createElement('p');
				newP.innerText = `${msg.message}`;
				
				msgContainer.append(newP);
				
			}
		)
	}
);



