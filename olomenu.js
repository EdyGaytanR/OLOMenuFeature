/*!
 * OLOMenuFeature v1.0.6
 * https://github.com/EdyGaytanR/OLOMenuFeature
 */
(async function() {
    var dt = new Date();

    year = dt.getFullYear();
    month = (dt.getMonth() + 1).toString().padStart(2, "0");
    day = dt.getDate().toString().padStart(2, "0");
    date = year + '-' + month + '-' + day
    let url = 'https://olo-api.spoton.com/api/emagine/merchants/' + id_merchant + '/menu-groups?includeMenuItems=true&orderDateTime=' + date + 'T10:22:25-05:00&orderTypeId=3uxw5e1y0vgz3dwi1we2ioj1lq';
    console.log(url)
    let response = await fetch(url);
    main_div = $('#olo_menu')
    loading = $('.spinner')

    type_dishes = await response.json();
    if (type_dishes.code == '500') {
        error = '<h1 class="spw-banner__title spw-headline">Error loading the menu</h1>'
        main_div.append(error)
    } else {
        for (type_dishes_counter = 0; type_dishes_counter < type_dishes.length; type_dishes_counter++) {
            non_dishes = exclude.includes(type_dishes[type_dishes_counter].name)
            if (non_dishes) {
                console.log(type_dishes[type_dishes_counter].name)
            } else {
                if (type_dishes[type_dishes_counter].menuItems != null) {
                    heads = '<div id=' + type_dishes[type_dishes_counter].id + ' class="element"><div class="dish"><h3 class="title">' + type_dishes[type_dishes_counter].name + '</h3><h4 class="description">' + type_dishes[type_dishes_counter].description + '</h4></div></div>'
                    main_div.append(heads)
                        /* div_main_block = document.createElement('div')
                            div_main_block.setAttribute('id', type_dishes[type_dishes_counter].id)
                            div_main_block.setAttribute('class', 'element')
                            div_dish = document.createElement('div')
                            div_dish.setAttribute('class', 'dish')
                            h3_title = document.createElement('h3')
                            h3_title.setAttribute('class', 'title')
                            h3_title.innerText = type_dishes[type_dishes_counter].name
                            h4_subtitle = document.createElement('h4')
                            h4_subtitle.setAttribute('class', 'title')
                            h4_subtitle.innerText = type_dishes[type_dishes_counter].description
                            div_dish.append(h3_title)
                            div_dish.append(h4_subtitle)
                            div_main_block.append(div_dish)
                            main_div.append(div_main_block) */
                    for (menu_item_counter = 0; menu_item_counter < type_dishes[type_dishes_counter].menuItems.length; menu_item_counter++) {
                        if (type_dishes[type_dishes_counter].menuItems[menu_item_counter].price != "" && type_dishes[type_dishes_counter].menuItems[menu_item_counter].price != "0") {
                            basic = '<div class="menu_item"><div class="basic_info"><p class="title">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].name + '</p><hr><p class="price">$' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].price + '</p></div><p class="description">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].description + '</p></div>'
                            $('#' + type_dishes[type_dishes_counter].id).append(basic)
                                //div_item = document.createElement('div')
                                //div_item.setAttribute('class', 'menu_item')
                            $('#' + type_dishes[type_dishes_counter].id).add('<div class="special_info"></div>')
                        } else {
                            id_subitem = type_dishes[type_dishes_counter].menuItems[menu_item_counter].menuItemLocationId
                            let new_request = 'https://olo-api.spoton.com/api/emagine/merchants/' + id_merchant + '/menu-items/' + id_subitem + '?orderDateTime=' + date + 'T10:22:25-05:00&orderTypeId=3uxw5e1y0vgz3dwi1we2ioj1lq';
                            let response_zero_price = await fetch(new_request);

                            item_zero_price = await response_zero_price.json();
                            if (item_zero_price.modifiers != '') {
                                basic = '<div class="menu_item"><div class="basic_info"><p class="title">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].name + '</p></div><p class="description">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].description + '</p></div>'
                                $('#' + type_dishes[type_dishes_counter].id).append(basic)
                                for (modifiers_counter = 0; modifiers_counter < item_zero_price.modifiers[0].modifiers.length; modifiers_counter++) {
                                    if (item_zero_price.modifiers[0].modifiers[modifiers_counter].choiceListPrice != '0') {
                                        modifers = '<div class="special_info"><div class="modifers"><div class="item"><p class="name">' + item_zero_price.modifiers[0].modifiers[modifiers_counter].name + '</p><hr><p class="price">$' + item_zero_price.modifiers[0].modifiers[modifiers_counter].choiceListPrice + '</p></div></div></div>'
                                        $('#' + type_dishes[type_dishes_counter].id).append(modifers)
                                    } else {
                                        modifers = '<div class="special_info"><div class="modifers"><div class="item"><p class="name">' + item_zero_price.modifiers[0].modifiers[modifiers_counter].name + '</p></div></div></div>'
                                        $('#' + type_dishes[type_dishes_counter].id).append(modifers)
                                    }
                                }
                                if (item_zero_price.modifiers[1]) {
                                    for (modifiers_counter = 0; modifiers_counter < item_zero_price.modifiers[1].modifiers.length; modifiers_counter++) {
                                        if (item_zero_price.modifiers[1].modifiers[modifiers_counter].choiceListPrice != '0') {
                                            modifers = '<div class="special_info"><div class="modifers"><div class="item"><p class="name">' + item_zero_price.modifiers[1].modifiers[modifiers_counter].name + '</p><hr><p class="price">$' + item_zero_price.modifiers[1].modifiers[modifiers_counter].choiceListPrice + '</p></div></div></div>'
                                            $('#' + type_dishes[type_dishes_counter].id).append(modifers)
                                        } else {
                                            modifers = '<div class="special_info"><div class="modifers"><div class="item"><p class="name">' + item_zero_price.modifiers[1].modifiers[modifiers_counter].name + '</p></div></div></div>'
                                            $('#' + type_dishes[type_dishes_counter].id).append(modifers)
                                        }
                                    }
                                }
                            }
                            if (item_zero_price.subItems != '') {
                                basic = '<div class="menu_item"><div class="basic_info"><p class="title">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].name + '</p></div><p class="description">' + type_dishes[type_dishes_counter].menuItems[menu_item_counter].description + '</p></div>'
                                $('#' + type_dishes[type_dishes_counter].id).append(basic)
                                for (subitem_counter = 0; subitem_counter < item_zero_price.subItems[0].items.length; subitem_counter++) {
                                    if (item_zero_price.subItems[0].items[subitem_counter].price != '0') {
                                        subitem = '<div class="special_info"><div class="subitem"><div class="item"><p class="name">' + item_zero_price.subItems[0].items[subitem_counter].name + '</p><hr><p class="price">$' + item_zero_price.subItems[0].items[subitem_counter].price + '</p></div></div></div>'
                                        $('#' + type_dishes[type_dishes_counter].id).append(subitem)
                                    } else {
                                        subitem = '<div class="special_info"><div class="subitem"><div class="item"><p class="name">' + item_zero_price.subItems[0].items[subitem_counter].name + '</p></div></div></div>'
                                        $('#' + type_dishes[type_dishes_counter].id).append(subitem)
                                    }
                                }
                                if (item_zero_price.subItems[1]) {
                                    for (subitem_counter = 0; subitem_counter < item_zero_price.subItems[1].items.length; subitem_counter++) {
                                        if (item_zero_price.subItems[1].items[subitem_counter].price != '0') {
                                            subitem = '<div class="special_info"><div class="subitem"><div class="item"><p class="name">' + item_zero_price.subItems[1].items[subitem_counter].name + '</p><hr><p class="price">$' + item_zero_price.subItems[1].items[subitem_counter].price + '</p></div></div></div>'
                                            $('#' + type_dishes[type_dishes_counter].id).append(subitem)
                                        } else {
                                            subitem = '<div class="special_info"><div class="subitem"><div class="item"><p class="name">' + item_zero_price.subItems[1].items[subitem_counter].name + '</p></div></div></div>'
                                            $('#' + type_dishes[type_dishes_counter].id).append(subitem)
                                        }
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