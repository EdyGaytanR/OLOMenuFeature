/*!
 * OLOMenuFeature v1.0.1
 * https://github.com/EdyGaytanR/OLOMenuFeature
 */
(async function() {
    var dt = new Date();

    year = dt.getFullYear();
    month = (dt.getMonth() + 1).toString().padStart(2, "0");
    day = dt.getDate().toString().padStart(2, "0");
    date = year + '-' + month + '-' + day
    let url = 'https://olo-api.spoton.com/api/emagine/merchants/' + id_merchant + '/menu-groups?includeMenuItems=true&orderDateTime=' + date + 'T10:22:25-05:00&orderTypeId=3uxw5e1y0vgz3dwi1we2ioj1lq';
    //console.log(url)
    let response = await fetch(url);
    main_div = $('#olo_menu')
    loading = $('.spinner')

    type_dishes = await response.json();
    if (type_dishes.code == '500') {
        error = '<h1 class="spw-banner__title spw-headline">Error loading the menu</h1>'
        main_div.append(error)
    } else {
        for (type_dishes_counter = 0; type_dishes_counter < type_dishes.length; type_dishes_counter++) {
            if (type_dishes[type_dishes_counter].menuItems != null) {
                heads = '<div class="menu_item"><div class="dish"><h3 class="title">' + type_dishes[type_dishes_counter].name + '</h3><h4 class="description">' + type_dishes[type_dishes_counter].description + '</h4></div></div>'
                main_div.append(heads)
                for (menu_item_counter = 0; menu_item_counter < type_dishes[type_dishes_counter].menuItems.length; menu_item_counter++) {
                    if (type_dishes[type_dishes_counter].menuItems[menu_item_counter].price != "" && type_dishes[type_dishes_counter].menuItems[menu_item_counter].price != "0") {
                        basic = '<div class="menu_item"><div class="basic_info"><p class="title">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].name + '</p><hr><p class="price">$' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].price + '</p></div><p class="description">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].description + '</p></div>'
                        main_div.append(basic)
                    } else {
                        id_subitem = type_dishes[type_dishes_counter].menuItems[menu_item_counter].menuItemLocationId
                        let new_request = 'https://olo-api.spoton.com/api/emagine/merchants/' + id_merchant + '/menu-items/' + id_subitem + '?orderDateTime=' + date + 'T10:22:25-05:00&orderTypeId=3uxw5e1y0vgz3dwi1we2ioj1lq';
                        let response_zero_price = await fetch(new_request);

                        item_zero_price = await response_zero_price.json();
                        if (item_zero_price.modifiers != '') {
                            basic = '<div class="menu_item"><div class="basic_info"><p class="title">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].name + '</p></div><p class="description">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].description + '</p></div>'
                            main_div.append(basic)
                            for (modifiers_counter = 0; modifiers_counter < item_zero_price.modifiers[0].modifiers.length; modifiers_counter++) {
                                if (item_zero_price.modifiers[0].modifiers[modifiers_counter].choiceListPrice != '0') {
                                    modifers = '<div class="special_info"><div class="modifers"><div class="item"><p class="name">' + item_zero_price.modifiers[0].modifiers[modifiers_counter].name + '</p><hr><p class="price">$' + item_zero_price.modifiers[0].modifiers[modifiers_counter].choiceListPrice + '</p></div></div></div>'
                                    main_div.append(modifers)
                                } else {
                                    modifers = '<div class="special_info"><div class="modifers"><div class="item"><p class="name">' + item_zero_price.modifiers[0].modifiers[modifiers_counter].name + '</p></div></div></div>'
                                    main_div.append(modifers)
                                }
                            }
                            if (item_zero_price.modifiers[1]) {
                                for (modifiers_counter = 0; modifiers_counter < item_zero_price.modifiers[1].modifiers.length; modifiers_counter++) {
                                    if (item_zero_price.modifiers[1].modifiers[modifiers_counter].choiceListPrice != '0') {
                                        modifers = '<div class="special_info"><div class="modifers"><div class="item"><p class="name">' + item_zero_price.modifiers[1].modifiers[modifiers_counter].name + '</p><hr><p class="price">$' + item_zero_price.modifiers[1].modifiers[modifiers_counter].choiceListPrice + '</p></div></div></div>'
                                        main_div.append(modifers)
                                    } else {
                                        modifers = '<div class="special_info"><div class="modifers"><div class="item"><p class="name">' + item_zero_price.modifiers[1].modifiers[modifiers_counter].name + '</p></div></div></div>'
                                        main_div.append(modifers)
                                    }
                                }
                            }
                        }
                        if (item_zero_price.subItems != '') {
                            basic = '<div class="menu_item"><div class="basic_info"><p class="title">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].name + '</p></div><p class="description">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].description + '</p></div>'
                            main_div.append(basic)
                            for (subitem_counter = 0; subitem_counter < item_zero_price.subItems[0].items.length; subitem_counter++) {
                                if (item_zero_price.subItems[0].items[subitem_counter].price != '0') {
                                    subitem = '<div class="special_info"><div class="subitem"><div class="item"><p class="name">' + item_zero_price.subItems[0].items[subitem_counter].name + '</p><hr><p class="price">$' + item_zero_price.subItems[0].items[subitem_counter].price + '</p></div></div></div>'
                                    main_div.append(subitem)
                                } else {
                                    subitem = '<div class="special_info"><div class="subitem"><div class="item"><p class="name">' + item_zero_price.subItems[0].items[subitem_counter].name + '</p></div></div></div>'
                                    main_div.append(subitem)
                                }
                            }
                            if (item_zero_price.subItems[1]) {
                                for (subitem_counter = 0; subitem_counter < item_zero_price.subItems[1].items.length; subitem_counter++) {
                                    if (item_zero_price.subItems[1].items[subitem_counter].price != '0') {
                                        subitem = '<div class="special_info"><div class="subitem"><div class="item"><p class="name">' + item_zero_price.subItems[1].items[subitem_counter].name + '</p><hr><p class="price">$' + item_zero_price.subItems[1].items[subitem_counter].price + '</p></div></div></div>'
                                        main_div.append(subitem)
                                    } else {
                                        subitem = '<div class="special_info"><div class="subitem"><div class="item"><p class="name">' + item_zero_price.subItems[1].items[subitem_counter].name + '</p></div></div></div>'
                                        main_div.append(subitem)
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }
        main_div.css('display', 'block')
        loading.css('display', 'none')
    }
})()