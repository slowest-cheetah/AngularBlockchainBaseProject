import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private ngUnsubscribe = new Subject<void>();

  isNavbarSticky = false;

  public isConnected: boolean = false;
  public selectedNetwork: string = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.isWalletConnected$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((isConnected) => {
      this.isConnected = isConnected;
    });

    this.adminService.walletNetwork$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((selectedNetwork) => {
      this.selectedNetwork = selectedNetwork;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const isWidthMoreThan767px = window.innerWidth > 767.98;
    this.isNavbarSticky = isWidthMoreThan767px && window.pageYOffset > 60;
  }

  onConnectMetamask() {
    if (this.isConnected) {
      // this.adminService.disconnectWallet();
    } else {
      this.adminService.connectWallet();
    }
  }

  onNetworkSelect(network: string) {
    this.adminService.changeNetwork(network);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
 
}
