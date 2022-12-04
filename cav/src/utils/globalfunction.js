import React from 'react'

//sleep
React.sleep=(delay)=> {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
      continue;
  }
}

 