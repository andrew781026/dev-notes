# 面試 SWAG 所出的題目 

Please implement Universal MD5 generator 
which works in browser, node server and Worker. ex:
MD5.addEventListener('computed', ({ filename, md5 }) => {
console.log(filename, md5);
});
MD5.generate({ file: file1, env: 'worker' });
// or MD5.compute({ file: file1, env: 'main thread' });

// console:
// "file1.png" "{file1 md5}"
Need to have queue feature (first in, first out), ex: ``` MD5.addEventListener(‘computed’, ({ filename, md5 }) => { console.log(filename, md5); }); MD5.generate({ file: file1 }); MD5.generate({ file: file2 });
// Output: // “file1.png” “{file1 md5}” // “file2.pdf” “{file2 md5}”

```

1.Need to handle big files, which means hash chunk-by-chunk.
2.Compute one at a time on main thread, and need to be non-blocking.
3.Compute multiple at a time on Worker (multiple workers).
**Nice to have: support service worker, support prioritizing. **Since coderpad don’t have npm and webpack feature, you may need to setup your own project or use https://codesandbox.io/ to develop, and paste your code back to answer.
