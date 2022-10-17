<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Demand extends Model
{
    use HasFactory;
    const OPEN = 0;
    const CLOSED = 1;
    //protected $guarded = [];
    protected $fillable = ['userId','title','text'];
    protected $appends = ['date', 'statusText'];

    public function customer(){
        return $this->hasOne(User::class, 'id', 'userId');
    }

    public function getStatusTextAttribute(){
        switch($this->attributes['status']){
            case self::CLOSED:
                return "Kapalı";
                break; 
            default:
                return "Açık";
                break;       
        }
    }

    static function timeAgo($gelen_zaman){
        $gelen_zaman = strtotime($gelen_zaman);
        $zaman_farki = time() - $gelen_zaman;
        $saniye = $zaman_farki;
        $dakika = round($zaman_farki/60);
        $saat = round($zaman_farki/3600);
        $gun = round($zaman_farki/86400);
        $hafta = round($zaman_farki/604800);
        $ay = round($zaman_farki/2419200);
        $yil = round($zaman_farki/29030400);

        if($saniye < 60){
            if($saniye == 0){
                return "az önce";
            }else{
                return $saniye . " saniye önce";
            }
        }else{
            if($dakika < 60){
                if($dakika == 0){
                    return "az önce";
                }else{
                    return $dakika . " dakika önce";
                }
            }
        }

       /* $timestamp = strtotime($date);
        $currentDate = new DateTime('@'.$timestamp);
        $nowDate = new DateTime('@'.time());
        return $currentDate
               ->diff($nowDate)
               ->format(' %y yıl %m ay %d gün %h saat %i dakika %s saniye önce');*/
    }

    public function getDateAttribute(){
        return self::timeAgo($this->attributes['created_at']);
    }
}
