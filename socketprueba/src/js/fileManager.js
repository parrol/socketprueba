function getFileExtension3(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}