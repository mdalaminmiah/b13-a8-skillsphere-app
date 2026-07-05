    
**Assignment Category : category-A8-Orange**

## **🎓 SkillSphere – Online Learning Platform**

**🚩🚩[Explanation Video](https://drive.google.com/drive/folders/1JLvszyjqZCwm1YLiGgU3hzfefn5jyux6?usp=sharing)**

##### **Project Theme**

A modern online learning platform where users can explore courses, watch lessons, and enroll in skill-based programs like Web Development, Design, Marketing, and more.  
---

##### **Key Things you have must to do**

* **GitHub Commits:** Include at least 10 meaningful commits with descriptive messages.

* **Readme.md:** Include a README file with the project name, purpose, live URL, key features, and any npm packages you have used.

* **Responsiveness:** Ensure the website is fully responsive on mobile, tablet, and desktop.

* **Environment Variables:** Secure configuration keys using environment variables.

* **Unique Design:**  Create a unique design that goes with the given Concept. You can use this [blog](https://medium.com/design-bootcamp/free-images-and-resources-collection-for-website-c77f2fc46ce5) for these kinds of resources 

* **Host your Application:**  You can choose deployment systems  like vercel, render for hosting . As you are developing a single page application   
  * ensure that  page doesn't throw any error on reloading from any routes.  

---

### 

### 

### **Main Requirements**

1. ##### **Layout Structure**

   #### **🔝 Navbar**

* Logo/Name (SkillSphere)  
* Links: Home, Courses, My Profile  
* If logged in:  
  * Show user avatar  
  * Logout button  
* If logged out:  
  * Login / Register buttons

  #### **🔻 Footer**

* Contact info  
* Social links  
* Terms & Conditions  
* Privacy policy

  #### **📦 Main Layout**

2. Persistent Navbar & Footer  
3. Route-based rendering (Next.js App Router)

4. ##### **JSON Data Generation**

At least 6 courses:

\[

 {

   "id": 1,

   "title": "Complete Web Development Bootcamp",

   "instructor": "John Doe",

   "duration": "20 hours",

   "rating": 4.8,

   "level": "Beginner",

   "description": "Learn full-stack web development from scratch.",

   "image": "https://i.postimg.cc/example-course1.png",

   "category": "Development"

 }

\]

5. ##### **Home**

   #### **🎥 Hero Section**

* Banner / slider  
* Example:  
  * “Upgrade Your Skills Today 🚀”  
  * “Learn from Industry Experts”

  #### **🔥 Popular Courses**

* Top 3 highest-rated courses  
* Each card shows:  
  * Image  
  * Course Title  
  * Instructor  
  * Rating  
  * View Details button

  #### **➕ Extra Sections**

📌 **Learning Tips Section**

* Study techniques  
* Time management tips

🏆 **Top Instructors Section**

3–4 instructor cards

##### **6 . All Courses Page** 

##### Here, all course data will be displayed. From this page, clicking the **“Details”** button will navigate to the **course details page.**

#####   **7 . Course Details Page 🔒 (Protected Route)**

* Only accessible if logged in  
* If not logged in → redirect to login  
* After login → redirect back

  #### **Show:**

* Full course details  
* Course curriculum (static list)

##### **8 . Authentication**

When a user clicks the login button from navbar, the user will land on the Login page. 

**User Login**  
The user will  show  a Login page with a form , so that the user can Log in this application. 

- Show a Title for Login.  & Form with following fields   
  ( Email , Password , Login button ) 

If the user Login successfully then 

- navigate him to his Home page.  
- If not, show him an error with toast / error message anywhere in the form.

There will be some other options like 

- Show the user a Link for Register  so that he can go to the register page.   
- Show users a Social Login Button ( Google only ) . on Clicking it   
  - user authenticate with Google  
  -  Navigate him to  his Home page.

   
**User Registration**  
Create a register page with a form , so that the user can register himself in this application. 

- Show a Title for registration and a Form with following fields

( Name , Email, Photo-url(link), Password & Register Button ) 

If the user Register successfully then 

- navigate him to his login page.  
- If not, show him an error with toast / error message anywhere in the form.

There will be some other options like 

- Show the user a Link for Login so that he can go to the Login page.   
- Show users a Social Login Button ( Google only ) . on Clicking it   
  - user authenticate with Google  
  - Navigate the user to the Home page.

 💡Don’t implement email verification or forget password method as it will inconvenience the examiner. If you want, you can add these after receiving the assignment result.

##### **Other Requirements** 

* Add 1 extra section:  
   👉 “Trending Courses” or “New Releases”  
* Use toast notifications  
* No crashes on reload  
* Clean App Router structure  
* Show loader on data fetching   
* Not-found page implementation

### **9 . Challenges** 

**1\. Search Functionality**

1\. Add a search input on the All Courses page.  
2\. Users can search courses by title .

##### **2\. My Profile** 

Add a My Profile page requirement so that students can implement it for showing logged-in profile data.    
There will be an update feature for name \&image Url. define this requirement in the challenge section. 

**3\.** **Update Information Feature**

- In my-profile route there will be an update button on Clicking it.  Take user to another route   
  - Show user a form with 2 input field ( image and Name )   
  - An Update Information button.

Follow this documentation: [**https://better-auth.com/docs/concepts/users-accounts\#update-user**](https://better-auth.com/docs/concepts/users-accounts#update-user) 

 

##### **4\.** Add requirement implementing  of any one npm package from the following

-   
- [Animate.css](https://animate.style/),   
- [React-Spring](https://www.react-spring.dev/docs/components/parallax)  
- [Motion](https://motion.dev/)  
- [Swiper js](https://swiperjs.com/demos) 

##### 

**Tech Stack:** 

* **Next JS**  
* **Tailwind CSS**  
* **DaisyUI/HeroUI**  
* **BetterAuth**

### **What to Submit** 

Your Github Repo Link :   
Your Live Link :   
