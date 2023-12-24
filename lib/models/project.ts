import mongoose from "mongoose";
mongoose.pluralize(null)

const projectSchema = new mongoose.Schema({
    "type": "String",
    "title": "String",
    "description": "String",
    "yearWiseProjects": [
      {
        "year": "Number",
        "projects": [
          {
            "name": "String",
            "title": "String",
            "image": "String",
            "description": "String",
            "reportLink": "String",
            "githubLink": "String",
            "demoLink": "String"
          }
        ]
      }
    ]
  }
  );
  export const Project =mongoose.models.projects || mongoose.model("projects", projectSchema)
  
  
  
