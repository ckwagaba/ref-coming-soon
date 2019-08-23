<div class="md-select-wrapper" id="md-select-year">
    <div class="md-select-label"></div>
    <div class="md-select-icon"><i class="material-icons">keyboard_arrow_down</i></div>
    <select class="md-select-component">
        <option selected disabled class="md-select-label" id="md-select-label-year" value="0">Year</option>
        <?php
        /**
         * server date is more reliable
         * minimum age is assumed to be 18
         * maximum age is assumed to be 100
         */
        $this_year = date('Y');
        for ($i = ($this_year - 18); ($this_year - $i) < 100; $i--) {
            echo '<option class="md-select-component-item" value="' . $i . '">' . $i . '</option>';
        }
        ?>
    </select>
</div>