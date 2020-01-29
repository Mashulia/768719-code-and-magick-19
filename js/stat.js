'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_HEIGHT = 15;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var barHeight = CLOUD_HEIGHT - (GAP * 6) - (FONT_HEIGHT * 4);

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getSaturated = function () {
  var randomNumber = Math.floor(Math.random() * 101);
  var randomColor = 'hsl(240, ' + randomNumber + '%, ' + randomNumber + '%)';
  return randomColor;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 3, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 3, CLOUD_Y + GAP + FONT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP * 2);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, (barHeight - (barHeight * times[i]) / maxTime) + GAP * 3 + (FONT_HEIGHT * 2));
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getSaturated();
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, FONT_HEIGHT * 3 + GAP * 4 + (barHeight - (barHeight * times[i]) / maxTime), BAR_WIDTH, (barHeight * times[i]) / maxTime);
  }
};
