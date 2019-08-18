<div class="md-select-wrapper" id="md-select-country">
    <div class="md-select-component-label"></div>
    <div class="md-select-icon"><i class="material-icons">keyboard_arrow_down</i></div>
    <select class="md-select-component" id="md-select-component-country">
        <option selected disabled class="md-select-component-label" id="md-select-label-country" value="0">Country</option>
        <?php
        $countries_string = file_get_contents('./json/countries.json');
        $countries_array = json_decode($countries_string, true);
        foreach ($countries_array as $country) {
            $item = '<option class="md-select-component-item" value="' . $country['name'] . '" data-code="' . $country['code'] . '" data-dial-code="' . $country['dial_code'] . '">';
                $item .= $country['name'];
            $item .= '</option>';
            echo $item;
        }
        ?>
    </select>
</div>