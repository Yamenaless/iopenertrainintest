export const links = [
  { id: 1, url: "/", text: "Home" },
  { id: 2, url: "/About", text: "About us" },
  { id: 3, url: "/categories", text: "Training Categories" },
  { id: 4, url: "/cities", text: "Cities" },
  { id: 5, url: "/contact", text: "Contact us" },
];
export const footerMenu = [
  { id: 5, url: "/Faq", text: "FAQ" },
  { id: 1, url: "/About", text: "About us" },
  { id: 2, url: "/Contact", text: "Contact us" },
  // { id: 3, url: "/Privacy", text: "Privacy Policy" },
  // { id: 4, url: "/Terms", text: "Terms and Condition" },
];
export const social = [
  {
    id: 1,
    url: "http://localhost:3000/en/metaverse",
    text: (
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5v14m8-7h-2m0 0h-2m2 0v2m0-2v-2M3 11h6m-6 4h6m11 4H4c-.55228 0-1-.4477-1-1V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z"
        />
      </svg>
      
    ),
  },
  {
    id: 2,
    url: "https://www.facebook.com/profile.php?id=61559483153181&mibextid=ZbWKwL",
    text: <i className="fa-brands fa-facebook-f"></i>,
    blank : "_blank"
  },
  {
    id: 3,
    url: "https://www.instagram.com/iopener_training_group?igsh=ZmZleXRhN3ZiYmlk",
    text: <i className="fa-brands fa-instagram"></i>,
    blank : "_blank"
  },
  {
    id: 4,
    url: "https://www.linkedin.com/company/iopener-training-center/",
    text: <i className="fa-brands fa-linkedin-in"></i>,
    blank : "_blank"
  },
  {
    id: 5,
    url: "https://www.youtube.com/@iOpenerTrainingGroup.",
    text: <i className="fa-brands fa-youtube"></i>,
    blank : "_blank"
  },
  {
    id: 6,
    url: "https://twitter.com/iOpenerGroup",
    text: <i className="fa-brands fa-x-twitter"></i>,
    blank : "_blank"
  },
];
