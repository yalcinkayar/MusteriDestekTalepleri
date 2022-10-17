<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Demand;

class DemandMessage extends Model
{
    use HasFactory;
    protected $fillable = ['demandId','userId','text'];

    public function user(){
        return $this->hasOne(User::class, 'id', 'userId');
    }

    public function getDateAttribute(){
        return Demand::timeAgo($this->attribute['created_at']);
    }
}
