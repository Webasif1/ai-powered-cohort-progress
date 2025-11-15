const teamName = document.querySelector(".team-name");
const captainName = document.querySelector(".captain-name");
const coachName = document.querySelector(".coach-name");
const ownerName = document.querySelector(".owner-name");
const venue = document.querySelector(".venue");
const win = document.querySelector(".win");
const shortName = document.querySelector(".show-data h1");
const btn = document.querySelector("button");
const main = document.querySelector("main");
const box = document.querySelector(".show-data")



let team;

const teams = [
    {
    name: "CSK",
    fullName: "Chennai Super Kings",
    captain: "MS Dhoni",
    coach: "Stephen Fleming",
    owner: "Chennai Super Kings Cricket Limited",
    venue: "M. A. Chidambaram Stadium",
    win: [2010, 2011, 2018, 2021, 2023],
    primaryColor: "#FFCB05",
    secondaryColor:"#262B38"
  },
  {
    name: "MI",
    fullName: "Mumbai Indians",
    captain: "Hardik Pandya",
    coach: "Mahela Jayawardene",
    owner: "Reliance Industries / Mukesh Ambani",
    venue: "Wankhede Stadium, Mumbai",
    win: [2013, 2015, 2017, 2019, 2020],
    primaryColor: "#2D6AB1",
    secondaryColor:"#133266"

  },
  {
    name: "KKR",
    fullName: "Kolkata Knight Riders",
    captain: "Ajinkya Rahane",
    coach: "Chandrakant Pandit",
    owner: "Shah Rukh Khan, Juhi Chawla & Jay Mehta",
    venue: "Eden Gardens, Kolkata",
    win: [2012, 2014, 2024],
    primaryColor: "#ECC542",
    secondaryColor:"#281F4A"
  },
  {
    name: "GT",
    fullName: "Gujarat Titans",
    captain: "Shubman Gill",
    coach: "Ashish Nehra",
    owner: "Torrent Group / CVC Capital",
    venue: "Narendra Modi Stadium, Ahmedabad",
    win: [2022],
    primaryColor: "#77C7F2",
    secondaryColor:"#0D1A30"

  },
  {
    name: "SRH",
    fullName: "Sunrisers Hyderabad",
    captain: "Pat Cummins",
    coach: "Daniel Vettori",
    owner: "Sun TV Network / Kalanithi Maran",
    venue: "Rajiv Gandhi International Cricket Stadium, Hyderabad",
    win: [2016],
    primaryColor: "#F26522",
    secondaryColor:"#712324"
  },
  {
    name: "RR",
    fullName: "Rajasthan Royals",
    captain: "Sanju Samson",
    coach: "Rahul Dravid",
    owner: "Manoj Badale, RedBird Capital, Lachlan Murdoch",
    venue: "Sawai Mansingh Stadium, Jaipur",
    win: [2008],
    primaryColor: "#EB83B5",
    secondaryColor:"#052A59"
  },
  {
    name: "RCB",
    fullName: "Royal Challengers Bengaluru",
    captain: "Rajat Patidar",
    coach: "Andy Flower",
    owner: "United Spirits (Vijay Mallya earlier)",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    win: [2025],
    primaryColor: "#2B2A29",
    secondaryColor:"#461A1D"
  },
  {
    name: "LSG",
    fullName: "Lucknow Super Giants",
    captain: "Rishabh Pant",
    coach: "Justin Langer",
    owner: "RP‑Sanjiv Goenka Group",
    venue: "Ekana Cricket Stadium, Lucknow",
    win: ["🤣🤣🤣Loading..."],
    primaryColor: "#FFFFFF",
    secondaryColor:"#0248BB"
  },
  {
    name: "PBKS",
    fullName: "Punjab Kings",
    captain: "Shreyas Iyer",
    coach: "Ricky Ponting",
    owner: "KPH Dream Cricket (Preity Zinta, Ness Wadia, etc.)",
    venue: "Maharaja Yadavindra Singh Stadium, Mohali",
    win: ["🤣🤣🤣Loading..."],
    primaryColor: "#D71920",
    secondaryColor:"#283766"
  },
  {
    name: "DC",
    fullName: "Delhi Capitals",
    captain: "Axar Patel",
    coach: "Hemang Badani",
    owner: "GMR Group & JSW Group",
    venue: "Arun Jaitley Stadium, Delhi",
    win: ["🤣🤣🤣Loading..."],
    primaryColor: "#B9251C",
    secondaryColor:"#021850"
  }

]

function randomTeam(){
  const i = Math.floor(Math.random()*teams.length);
  team = teams[i];
}

function teamData(){
  shortName.innerHTML = team.name
  teamName.innerHTML = team.fullName
  captainName.innerHTML = team.captain
  coachName.innerHTML = team.coach
  ownerName.innerHTML = team.owner
  venue.innerHTML = team.venue
  win.innerHTML = team.win
}
function changeColor(){
  main.style.backgroundColor = team.primaryColor;
  box.style.backgroundColor = team.secondaryColor;
}

btn.addEventListener("click", ()=>{
  randomTeam();
  teamData();
  changeColor();
})



