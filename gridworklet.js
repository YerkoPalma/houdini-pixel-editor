registerPaint('grid', class {
  static get inputProperties() {
    return [
      '--rows',
      '--columns',
      '--height',
      '--width',
      '--grid'
    ]
  }
  
  drawGrid (ctx, width, height, rows, columns) {
    // draw borders
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(width, 0)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, height)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(0, height)
    ctx.lineTo(width, height)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(width, 0)
    ctx.lineTo(width, height)
    ctx.stroke()
    
    // draw horizontal lines
    for (var i = 1; i < rows; i++) {
      ctx.beginPath()
      ctx.moveTo(0, i * (height / rows))
      ctx.lineTo(width, i * (height / rows))
      ctx.stroke()
    }
    for (var i = 1; i < columns; i++) {
      ctx.beginPath()
      ctx.moveTo(i * (width / columns), 0)
      ctx.lineTo(i * (width / columns), height)
      ctx.stroke()
    }
  }
  drawPixels (ctx, rows, columns, points, width, height, colors) {
    var size = [width / columns, height / rows]
    for (var x = 0; x < rows; x++) {
      for (var y = 0; y < columns; y++) {
        var point = points[y * columns + x] || 0
        ctx.beginPath()
        ctx.fillStyle = colors[point]
        ctx.rect(x * size[0], y * size[1], size[0], size[1])
        ctx.fill()
      }
    }
  }
  paint (ctx, geom, properties) {
    var height = properties.get('--height').toString()
    var width = properties.get('--width').toString()
    var rows = properties.get('--rows').toString()
    var columns = properties.get('--columns').toString()
    // draw pixels
    var points = properties.get('--grid').toString().split(' ')
    var colors = ['#CCCCCC', '#777777']
    
    this.drawPixels(ctx, rows, columns, points, width, height, colors)
    this.drawGrid(ctx, width, height, rows, columns)
  }
})
