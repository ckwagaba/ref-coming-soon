<?php
require_once('./includes/meta.php');
?>
<div id="hero">
    <div>
        <?php
        echo file_get_contents("./images/logo-arrow.svg");
        ?>
    </div>
</div>
<div id="main">
    <header>
        <div class="logo-container">
            <?php echo file_get_contents("./images/logo.svg"); ?>
        </div>
        <div class="title">
            <div class="sub-heading">Stay Tuned</div>
            <div class="heading">We are launching soon!</div>
            <div class="main-footer-copy">
                Be notified first when the REF. website goes live. <br />Get a <strong>FLAT 15%</strong> Discount Shopping Voucher as our Loyal VIP Customer.
            </div>
        </div>
    </header>
    <main>
        <div class="form-wrapper">
            <form action="" method="POST">

                <div class="input-wrapper">
                    <div class="input-group">
                        <div class="input-label">Email Address *</div>
                        <div class="input-field">
                            <input type="email" placeholder="example@domain.com" id="email" required />
                            <button id="submit-button">Notify Me</button>
                        </div>
                    </div>
                </div>

                <div id="form-feedback">&nbsp;</div>
            </form>
        </div>

        <div class="main-footer">
            <div class="main-footer-logos">
                <?php
                echo file_get_contents("./images/cafe.svg");
                echo file_get_contents("./images/sports.svg");
                echo file_get_contents("./images/garden.svg");
                ?>
            </div>
        </div>
    </main>
</div>