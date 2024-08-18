import { Octokit, App } from "octokit";

const octokit = new Octokit({ auth: `` });

export const MyDetails = async() =>{
   try {
      const response = await octokit.request('GET /users/{username}' , {
         username: 'secondaccountsadanand'
      })
    console.log('saf')
      return response.data
   } catch (error) {
      return error
   }
}

// id , name, html_url , description, language

export const RepoDetails = async() =>{
   const response = await octokit.request('GET /users/{username}/repos' , {
      username: 'SadanandMiskin'
   })
   // response.data.forEach((d) => {
   //    console.log(d.name)
   // })
   // console.log(response.data)
   // console.log(response.data)
   return response.data

}


export const ProjectDetails = async() => {
   const proj = [
      { 
         title: "EmpVerify", 
         description: "Web3 application for streamlined HR verification processes, ensuring transparency and tamper-proofing", 
         imageUrl: "https://via.placeholder.com/150", 
         technologies: ["Solidity", "Node.js", "MongoDB", "EJS"]
     },
     { 
         title: "Project 2", 
         description: "A brief description of Project 2", 
         imageUrl: "https://via.placeholder.com/150", 
         technologies: ["Vue.js", "Express", "PostgreSQL"]
     },
     { 
         title: "Project 2", 
         description: "A brief description of Project 2", 
         imageUrl: "https://via.placeholder.com/150", 
         technologies: ["Vue.js", "Express", "PostgreSQL"]
     },
     { 
         title: "Project 2", 
         description: "A brief description of Project 2", 
         imageUrl: "https://via.placeholder.com/150", 
         technologies: ["Vue.js", "Express", "PostgreSQL"]
     },
     { 
         title: "Project 2", 
         description: "A brief description of Project 2", 
         imageUrl: "https://via.placeholder.com/150", 
         technologies: ["Vue.js", "Express", "PostgreSQL"]
     },
     { 
         title: "Project 2", 
         description: "A brief description of Project 2", 
         imageUrl: "https://via.placeholder.com/150", 
         technologies: ["Vue.js", "Express", "PostgreSQL"]
     },
     { 
         title: "Project 2", 
         description: "A brief description of Project 2", 
         imageUrl: "https://via.placeholder.com/150", 
         technologies: ["Vue.js", "Express", "PostgreSQL"]
     },
   ]

   return proj
}

// RepoDetails()

// MyDetails()