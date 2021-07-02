export const executeResult = (data) => {
  let result = [];
  let temp = [];
  let total = [];

  var line = -1;
  var endBill = 0;
  var threshold = 20; // chiều cao của từ
  var startx = 0, startxcount = 0
  var sentence = "";
  var sentences = [];
  var sentencesBounds = [];
  var endXMin = 0;
  var line_height = 20;
  // edge of bill
  for (let i in data) {
    if (i === 0) continue;
    var bounding = data[i].boundingPoly?.vertices;
    endBill = Math.max(endBill, Math.max(bounding[1].x, bounding[3].x))
  }

  endXMin = endBill - 25 * endBill / 100; // calculate threshold for x
  // 
  var last_words;
  for (let i in data) {
    if (i == 0) continue;
    var bounds = data[i].boundingPoly.vertices;
    var word_middle = (bounds[1].y + bounds[2].y) / 2;

    if (line < 0) line = word_middle;

    if (Math.abs(word_middle - line) <= threshold) {
      sentence += " " + data[i].description;
    } else {
      // var x_middle = (last_words[1].x + last_words[3].x) / 2;

      // if (x_middle >= endXMin) {
      //   sentences.push(sentence);
      //   sentencesBounds.push(bounds)
      // }
      sentences.push(sentence);
      sentencesBounds.push(bounds)
      sentence = data[i].description;
      startx += bounds[0].x;
      startxcount++;
    }
    line = word_middle;
    last_words = bounds;
  }
  var block_sentences = [];
  var temp_block = [sentences[0]];
  console.log(sentences);

  for (let i = 0; i < sentencesBounds.length; i++) {
    console.log(i, temp_block);
    if (sentencesBounds[i + 1] && Math.abs(sentencesBounds[i + 1][2].y - sentencesBounds[i][1].y) <= 230) {
      temp_block.push(sentences[i + 1])
    } else {
      block_sentences.push(temp_block);
      temp_block = [sentences[i + 1]]
    }
  }


  console.log(block_sentences);
  // console.log(sentences);
  // console.log(sentencesBounds);
  return sentences
}