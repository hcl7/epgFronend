import FileSaver from "file-saver";

export const UseEmail = (data, filename) => {
    var blob = new Blob([data], { type: "application/xml;charset=utf-8"});
    return FileSaver.saveAs(blob, filename);
}