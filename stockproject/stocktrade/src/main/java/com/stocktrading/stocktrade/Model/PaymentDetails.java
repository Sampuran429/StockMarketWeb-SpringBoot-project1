package com.stocktrading.stocktrade.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;



// accountholdername
// : 
// null
// accountno
// : 
// null
// bankname
// : 
// null
// id
// : 
// 52
// ifsc
// : 
// ""
@Entity
@Data
public class PaymentDetails {
   

    private String accountholdername;

    private String accountno;

    private String bankname;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String ifsc;

 

    @OneToOne
    @JsonProperty(access =JsonProperty.Access.WRITE_ONLY)
    private User user;
}
