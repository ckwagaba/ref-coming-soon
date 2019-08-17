<div class="md-select-wrapper" id="md-select-month">
    <div class="md-select-component-label"></div>
    <div class="md-select-icon"><i class="material-icons">keyboard_arrow_down</i></div>
    <select class="md-select-component" id="md-select-component-month">
        <option selected disabled class="md-select-component-label" id="md-select-label-month" value="0">Month</option>
        <?php
        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];	
        for ($i = 0; $i < sizeof($months); $i++) {	
            echo '<option class="md-select-component-item" value="' . $months[$i] . '">' . $months[$i] . '</option>';	
        }	
        ?>
    </select>
</div>