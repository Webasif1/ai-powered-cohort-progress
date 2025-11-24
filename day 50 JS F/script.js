const reels = [
  {
    id: 1,
    username: "asif_dev",
    avatar: "https://i.pravatar.cc/150?img=12",
    videoUrl: "./video/video01.mp4",
    caption: "Late night coding vibes 💻✨",
    likes: 1290,
    comments: 87,
    shares: 34,
    isLiked: false,
    timeAgo: "2h"
  },
  {
    id: 2,
    username: "foodie_john",
    avatar: "https://i.pravatar.cc/150?img=32",
    videoUrl: "./video/video02.mp4",
    caption: "Street food hits different 😋🔥",
    likes: 890,
    comments: 45,
    shares: 12,
    isLiked: true,
    timeAgo: "4h"
  },
  {
    id: 3,
    username: "travel_with_niha",
    avatar: "https://i.pravatar.cc/150?img=25",
    videoUrl: "./video/video03.mp4",
    caption: "Sunset at Cox’s Bazar 🌅",
    likes: 2500,
    comments: 120,
    shares: 50,
    isLiked: false,
    timeAgo: "1d"
  },
  {
    id: 4,
    username: "fitness_ahmed",
    avatar: "https://i.pravatar.cc/150?img=18",
    videoUrl: "./video/video04.mp4",
    caption: "No pain, no gain 💪🔥",
    likes: 4200,
    comments: 310,
    shares: 76,
    isLiked: true,
    timeAgo: "3d"
  },
  {
    id: 5,
    username: "catlover_meow",
    avatar: "https://i.pravatar.cc/150?img=41",
    videoUrl: "./video/video05.mp4",
    caption: "My cat thinks she owns the house 😹",
    likes: 3300,
    comments: 210,
    shares: 44,
    isLiked: false,
    timeAgo: "5h"
  },
  {
    id: 6,
    username: "style_by_rima",
    avatar: "https://i.pravatar.cc/150?img=55",
    videoUrl: "./video/video06.mp4",
    caption: "OOTD ✨ #fashion",
    likes: 780,
    comments: 34,
    shares: 9,
    isLiked: false,
    timeAgo: "7h"
  },
  {
    id: 7,
    username: "gaming_zone",
    avatar: "https://i.pravatar.cc/150?img=44",
    videoUrl: "./video/video07.mp4",
    caption: "Try not to rage challenge 🎮😤",
    likes: 5600,
    comments: 690,
    shares: 120,
    isLiked: true,
    timeAgo: "10h"
  },
  {
    id: 8,
    username: "nature_lens",
    avatar: "https://i.pravatar.cc/150?img=9",
    videoUrl: "./video/video08.mp4",
    caption: "Morning dew + macro lens = magic 🍃✨",
    likes: 2200,
    comments: 150,
    shares: 30,
    isLiked: false,
    timeAgo: "12h"
  },
  {
    id: 9,
    username: "tech_review_pro",
    avatar: "https://i.pravatar.cc/150?img=67",
    videoUrl: "./video/video09.mp4",
    caption: "This gadget blew my mind 🤯⚡",
    likes: 980,
    comments: 60,
    shares: 15,
    isLiked: false,
    timeAgo: "22h"
  },
  {
    id: 10,
    username: "funny_world",
    avatar: "https://i.pravatar.cc/150?img=5",
    videoUrl: "./video/video10.mp4",
    caption: "POV: Your friend trying to be serious 😂",
    likes: 7100,
    comments: 800,
    shares: 200,
    isLiked: true,
    timeAgo: "2d"
  }
];
const allReel = document.querySelector(".all-reels");


let innerHtml = "";
reels.forEach(function(ele){
  innerHtml = innerHtml + `<div class="reels">
            <video muted autoplay loop src="${ele.videoUrl}"></video>
            <div class="bottom">
              <div class="user">
                <img src="${ele.avatar}" alt="">
                <h3>${ele.username}</h3>
                <button>Follow</button>
              </div>
              <p>${ele.caption}</p>
            </div>
            <div class="right">
              <div class="like">
                ${ele.isLiked?`<i class="ri-heart-2-line"></i>`:`<i class="ri-heart-2-fill"></i>`}
                <h5>${ele.likes}</h5>
              </div>
              <div class="comment">
                <i class="ri-chat-1-line"></i>
                <h5>${ele.comments}</h5>
              </div>
              <div class="share">
                <i class="ri-send-plane-2-line"></i>
                <h5>${ele.shares}</h5>
              </div>
              <div class="more">
                <i class="ri-more-2-line"></i>
              </div>
            </div>
          </div>`
})

console.log(innerHtml);
allReel.innerHTML = innerHtml;
