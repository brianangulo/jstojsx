import { readdirSync, rename } from "fs";
import { cwd } from "process";

//find all files in current directory with .baml extensions
const findAllJslFiles = () => {
  const currentDir = cwd();
  const allFilesInDir = readdirSync(currentDir);
  const filterJs = allFilesInDir.filter((file) => {
    const splitFile = file.split(".");
    if (splitFile[splitFile.length - 1] === "js" || "jsx") return true;
    else return false;
  });
  //if there are no baml in current dir rtrn false
  if (filterJs.length < 1) return false;
  return filterJs;
};
//save the paths to all of those files into a str array
const addFullPaths = () => {
  const jSFiles = findAllJslFiles();
  if (!jSFiles) return jSFiles;
  const currentDir = cwd();
  const arrOfPaths = jSFiles.map((file) => {
    return `${currentDir}/${file}`;
  });

  return arrOfPaths;
};

//translate single file
const renamer = (path: string) => {
  const splitPath = path.split(".");
  splitPath[splitPath.length - 1] = "tsx";
  const convertedPath: string = splitPath.join(".");
  rename(path, convertedPath, (err) => {if (err) throw err;});
}

export const translator = () => {
  const filePaths = addFullPaths();
  if (!filePaths) return filePaths;
  return filePaths.forEach((path) => {
    renamer(path);
  });
};