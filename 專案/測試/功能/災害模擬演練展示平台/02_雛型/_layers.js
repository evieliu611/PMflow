/* 兩個獨立圖層開關：討論模式（notes）/ 規格檢視（spec）。預設都關閉。 */
(function(){
  var q = new URLSearchParams(location.search);
  if(q.get('notes')==='1') document.body.classList.add('show-notes');
  if(q.get('spec')==='1')  document.body.classList.add('show-spec');
  window.toggleNotes=function(){ document.body.classList.toggle('show-notes'); };
})();
