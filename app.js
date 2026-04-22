$.getJSON("config.json", function (items) {
  items.sort(function (a, b) {
    return a.order - b.order;
  });

  var html = "";

  items.forEach(function (item, index) {
    html +=
      '<div class="rounded border p-2 flex flex-col items-center space-y-2" style="background-color: ' + item.color + ';">' +
      '  <div class="text-center">' +
      '    <div class="text-xl font-semibold">' + item.name + " (" + item.unit + ")</div>" +
      '    <div class="text-xl">' + item.price + " Kč</div>" +
      '  </div>' +
      '  <div class="flex items-center space-x-8">' +
      '    <button class="minus bg-red-500 text-white px-8 py-6 rounded text-2xl font-bold" data-index="' + index + '">-</button>' +
      '    <span class="quantity font-bold text-3xl" id="qty-' + index + '">0</span>' +
      '    <button class="plus bg-green-500 text-white px-8 py-6 rounded text-2xl font-bold" data-index="' + index + '">+</button>' +
      '  </div>' +
      "</div>";
  });

  $("#items").html(html);

  function updateTotal() {
    let total = 0;
    items.forEach(function(item, index) {
      let qty = parseInt($("#qty-" + index).text());
      total += qty * item.price;
    });
    $("#total-price").text(total + " Kč");
  }

  $(".plus").click(function() {
    let index = $(this).data("index");
    let $qty = $("#qty-" + index);
    let currentQty = parseInt($qty.text());
    $qty.text(currentQty + 1);
    updateTotal();
  });

  $(".minus").click(function() {
    let index = $(this).data("index");
    let $qty = $("#qty-" + index);
    let currentQty = parseInt($qty.text());
    if (currentQty > 0) {
      $qty.text(currentQty - 1);
      updateTotal();
    }
  });

  $("#clear-all").click(function() {
    $(".quantity").text(0);
    updateTotal();
  });
});