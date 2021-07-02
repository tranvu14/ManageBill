export const executeResult2 = (data) => {
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
  var startBill = 100000;
  for (let i in data) {
    if (i === 0) continue;
    var bounding = data[i].boundingPoly?.vertices;
    endBill = Math.max(endBill, Math.max(bounding[1].x, bounding[3].x))
  }
  const start_word = data.filter(val => Math.abs(val.boundingPoly?.vertices[0].x - startBill) <= 100)

  endXMin = endBill - 25 * endBill / 100; // calculate threshold for x
  // 
  var last_words;
  // for (let i in data) {
  //   if (i == 0) continue;
  //   var bounds = data[i].boundingPoly.vertices;
  //   var word_middle = (bounds[1].y + bounds[2].y) / 2;

  //   if (line < 0) line = word_middle;

  //   if (Math.abs(word_middle - line) <= threshold) {
  //     sentence += " " + data[i].description;
  //   } else {
  //     // var x_middle = (last_words[1].x + last_words[3].x) / 2;

  //     // if (x_middle >= endXMin) {
  //     //   sentences.push(sentence);
  //     //   sentencesBounds.push(bounds)
  //     // }
  //     sentences.push(sentence);
  //     sentencesBounds.push(bounds)
  //     sentence = data[i].description;
  //     startx += bounds[0].x;
  //     startxcount++;
  //   }
  //   line = word_middle;
  //   last_words = bounds;
  // }

  var block_sentences = [];
  var temp_result = [];
  // var middle_line = sentencesBounds.map(val => (val[1].y + val[2].y) / 2)

  for (let i = 1; i < data.length - 1; i++) {
    var bounds = data[i].boundingPoly.vertices;
    if (((bounds[1].x + bounds[3].x) / 2) / endBill > 0.8) {
      block_sentences.push({
        last_word: data[i].description,
        middle_line: ((bounds[1].y + bounds[2].y) / 2)
      })
    }
  }
  var filter_1 = block_sentences.filter(val => val.last_word.match(/(^[\d])/))
  var filter_2 = filter_1.filter(val => Number(val.last_word.replace(/\,/g, '')))

  for (let i in filter_2) {
    let temp_sentences = [];
    let sentence = "";
    for (let j in data) {
      let bounds = data[j].boundingPoly.vertices;
      if (Math.abs((bounds[1].y + bounds[2].y) / 2 - filter_2[i].middle_line) <= 80
        || Math.abs((bounds[3].y + bounds[2].y) / 2 - filter_2[i].middle_line) <= 120
      ) {
        if (data[j].description.match(/(^[\D]+)/)) {
          sentence += " " + data[j].description
        }
      }
    }

    temp_result.push({
      title: sentence,
      price: filter_2[i].last_word.replace(/\,/g, '')
    })
  }
  console.log(temp_result);
  // console.log(sentencesBounds);
  return temp_result
}