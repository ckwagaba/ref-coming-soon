<div class="md-select-wrapper" id="md-select-location">
    <div class="md-select-component-label"></div>
    <div class="md-select-icon"><i class="material-icons">keyboard_arrow_down</i></div>
    <select class="md-select-component" id="md-select-component-location">
        <option selected disabled class="md-select-component-label" id="md-select-label-location" value="0">Country</option>
        <?php
        $countries_string = file_get_contents('./json/countries.json');
        $countries_array = json_decode($countries_string, true);
        foreach ($countries_array as $key => $value) {
            $item = '<option class="md-select-component-item" value="' . $value . '">';
                $item .= $value;
            $item .= '</option>';
            echo $item;
        }
        ?>
    </select>
</div>