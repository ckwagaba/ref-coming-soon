<?php
require_once('./includes/meta.php');
?>
<div id="customer-page">
<header>
    <div class="wrapper">
        <div class="logo-container">
            <?php echo file_get_contents("./images/logo.svg"); ?>
        </div>
        <div class="title">
            <div class="heading">Customer Information</div>
        </div>
    </div>
</header>
<main>
    <div class="wrapper">
        <?php
        // make db connection
        require_once('./helpers/db.php');

        /**
         * get list of customers
         */
        $customers = $pdo->query('SELECT * FROM customer ORDER BY id DESC')->fetchAll(PDO::FETCH_ASSOC);
        $list_container = '<div class="list-layout">';
            // header
            $list_container_header = '<div class="list-header">';
                $list_container_header .= '<div>Name</div>';
                $list_container_header .= '<div>Email Address</div>';
                $list_container_header .= '<div>Phone Number</div>';
                $list_container_header .= '<div>Date of Birth</div>';
                $list_container_header .= '<div>Country</div>';
            $list_container_header .= '</div>';

            // main
            $list_container_main = '<div class="list-main">';
                foreach ($customers as $customer) {
                    // list item
                    $list_item = '<div class="list-item">';
                        $list_item .= '<div>' . $customer['firstname'] . ' ' . $customer['lastname'] . '</div>';
                        $list_item .= '<div>' . $customer['email'] . '</div>';
                        $list_item .= '<div>' . $customer['phone'] . '</div>';
                        $list_item .= '<div>' . $customer['dob'] . '</div>';
                        $list_item .= '<div>' . $customer['country'] . '</div>';
                    $list_item .= '</div>';
                    // add item to list
                    $list_container_main .= $list_item;
                }
            $list_container_main .= '</div>';
        
        // append
        $list_container .= $list_container_header;
        $list_container .= $list_container_main;
        $list_container .= '</div>';

        // return list
        echo $list_container;
        ?>
    </div>
</main>
</div>
<?php
require_once('./includes/footer.php');
?>