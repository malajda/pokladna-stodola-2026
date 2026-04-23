$.getJSON("config.json", function (items) {
  items.sort(function (a, b) {
    return a.order - b.order;
  });

  let html = "";

  items.forEach(function (item, index) {
    html +=
      '<div class="rounded border p-2 flex flex-col items-center space-y-2" style="background-color: ' + item.color + ';">' +
      '  <div class="text-center">' +
      '    <div class="text-lg sm:text-xl font-semibold">' + item.name + " " + item.unit + ' <span class="text-blue-700 font-bold">(' + item.price + " Kč)</span></div>" +
      '  </div>' +
      '  <div class="flex items-center space-x-6 sm:space-x-8">' +
      '    <button class="minus bg-red-500 text-white px-6 py-4 sm:px-8 sm:py-6 rounded text-xl sm:text-2xl font-bold" data-index="' + index + '">-</button>' +
      '    <span class="quantity font-bold text-2xl sm:text-3xl" id="qty-' + index + '">0</span>' +
      '    <button class="plus bg-green-500 text-white px-6 py-4 sm:px-8 sm:py-6 rounded text-xl sm:text-2xl font-bold" data-index="' + index + '">+</button>' +
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

  $("#generate-recap").click(function() {
    let recapHtml = "";
    let total = 0;
    let hasItems = false;
    
    items.forEach(function(item, index) {
      let qty = parseInt($("#qty-" + index).text());
      if (qty > 0) {
        hasItems = true;
        recapHtml += '<div class="flex justify-between border-b pb-1">' +
                     '<span>' + qty + 'x ' + item.name + ' (' + item.unit + ')</span>' +
                     '<span class="font-semibold">' + (qty * item.price) + ' Kč</span>' +
                     '</div>';
        total += qty * item.price;
      }
    });

    if (hasItems) {
      $("#recap-content").html(recapHtml);
      $("#recap-total").text("Celkem: " + total + " Kč");
      $("#recap-modal").removeClass("hidden");
    }
  });

  $("#close-modal").click(function() {
    $("#recap-modal").addClass("hidden");
    $(".quantity").text(0);
    updateTotal();
  });

  // Close modal when clicking outside
  $(window).click(function(event) {
    if (event.target == document.getElementById("recap-modal")) {
      $("#recap-modal").addClass("hidden");
    }
  });
});