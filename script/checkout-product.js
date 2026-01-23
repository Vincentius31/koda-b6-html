$(document).ready(function () {

    let orders = [
        {
            name: "Hazelnut Latte",
            qty: 2,
            price: 20000,
            img: "img/image 31.png"
        },
        {
            name: "Hazelnut Latte",
            qty: 2,
            price: 20000,
            img: "img/image 31.png"
        }
    ];

    const TAX_RATE = 0.1;
    const DELIVERY_FEE = 0;
    
    function renderOrder() {
        $(".left .order-card").remove();

        let orderTotal = 0;

        $.each(orders, function (index, item) {

            let itemTotal = item.qty * item.price; 
            orderTotal += itemTotal;

            let orderCard = $("<div>").addClass("order-card").attr("data-index", index);
            let img = $("<img>").attr("src", item.img).attr("alt", item.name);
            let orderInfo = $("<div>").addClass("order-info");
            let badge = $("<span>").addClass("badge-sale").text("FLASH SALE!");
            let title = $("<h4>").text(item.name);
            let desc = $("<p>").text(item.qty + "pcs | Regular | Ice | Dine In");
            let priceBox = $("<div>").addClass("price");
            let oldPrice = $("<span>").addClass("old").text("IDR 40.000");
            let newPrice = $("<span>").addClass("new").text("IDR " + formatRupiah(itemTotal));
            let removeBtn = $("<button>").addClass("remove").text("✕");

            priceBox.append(oldPrice, newPrice);
            orderInfo.append(badge, title, desc, priceBox);
            orderCard.append(img, orderInfo, removeBtn);

            $(".order-header").after(orderCard);
        });


        let tax = orderTotal * TAX_RATE;
        let subTotal = orderTotal + tax + DELIVERY_FEE;

        $(".right .row:eq(0) span:eq(1)")
            .text("Idr. " + formatRupiah(orderTotal));

        $(".right .row:eq(1) span:eq(1)")
            .text("Idr. " + formatRupiah(DELIVERY_FEE));

        $(".right .row:eq(2) span:eq(1)")
            .text("Idr. " + formatRupiah(tax));

        $(".right .total span:eq(1)")
            .text("Idr. " + formatRupiah(subTotal));
    }

    $(".left").on("click", ".remove", function () {
        let index = $(this).closest(".order-card").data("index");
        orders.splice(index, 1);
        renderOrder();
    });

    function formatRupiah(number) {
        return number.toLocaleString("id-ID");
    }

    renderOrder();
});