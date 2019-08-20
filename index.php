<?php
require_once('./includes/meta.php');
?>
<header>
    <div class="wrapper">
        <div class="logo-container">
            <?php echo file_get_contents("./images/logo.svg"); ?>
        </div>
        <div class="title">
            <div class="heading">Join our REF. newsletters</div>
            <div class="sub-heading">Sign up to receive a FLAT <strong>10% off</strong> your ORDER NOW.</div>
        </div>
    </div>
</header>
<main>
    <div class="wrapper">
        <div class="form-wrapper">
            <form action="" method="POST">
                <div class="input-wrapper">
                    <div class="input-group">
                        <div class="input-label">First Name</div>
                        <div class="input-field">
                            <input type="text" placeholder="Jane" id="first-name" />
                        </div>
                    </div>
                    <div class="input-group">
                        <div class="input-label">Last Name</div>
                        <div class="input-field">
                            <input type="text" placeholder="Doe" id="last-name" />
                        </div>
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="input-group only-child">
                        <div class="input-label">Email Address</div>
                        <div class="input-field">
                            <input type="email" placeholder="example@domain.com" id="email" />
                        </div>
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="input-group">
                        <div class="input-label">Country of Residence</div>
                        <div class="select-group">
                            <?php require_once('./includes/countries.php'); ?>
                        </div>
                    </div>
                    <div class="input-group">
                        <div class="input-label">Phone Number</div>
                        <div class="input-field">
                            <input type="tel" placeholder="+256 700 123456" id="phone" />
                        </div>
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="input-group only-child">
                        <div class="input-label">Date of Birth</div>
                        <div class="select-group">
                            <?php require_once('./includes/months.php'); ?>
                            <?php require_once('./includes/days.php'); ?>
                        </div>
                    </div>
                </div>

                <div class="button-wrapper">
                    <button id="submit-button">submit</button>
                </div>

                <div id="form-feedback">&nbsp;</div>
            </form>
        </div>

        <div class="main-footer">
            <div class="main-footer-copy">
                Be notified first when the REF. website goes live. <br />Get a <strong>FLAT 15%</strong> Discount Shopping Voucher as our Loyal VIP Customer.
            </div>
            <div class="main-footer-logos">
                <?php
                echo file_get_contents("./images/cafe.svg");
                echo file_get_contents("./images/sports.svg");
                echo file_get_contents("./images/garden.svg");
                ?>
            </div>
        </div>
    </div>
</main>
<?php
require_once('./includes/footer.php');
?>